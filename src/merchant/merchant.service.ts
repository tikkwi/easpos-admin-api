import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Document } from 'mongoose';
import {
   CreateMerchantDto,
   MerchantServiceMethods,
   MerchantUserLoginDto,
   MerchantVerifyDto,
} from '@common/dto/merchant.dto';
import { FindByIdDto } from '@common/dto/core.dto';
import { EStatus, EUserApp } from '@common/utils/enum';
import { $dayjs } from '@common/utils/datetime';
import AppService from '@common/decorator/app_service.decorator';
import BaseService from '@common/core/base/base.service';
import AppSubscriptionService from '../app_subscription/app_subscription.service';
import RequestContextService from '@common/core/request_context/request_context_service';
import Merchant from '@common/schema/ms/merchant.schema';
import CategoryService from '@shared/category/category.service';

@AppService()
export default class MerchantService
   extends BaseService<Merchant>
   implements MerchantServiceMethods
{
   constructor(
      private readonly subscriptionService: AppSubscriptionService,
      private readonly categoryService: CategoryService,
   ) {
      super();
   }

   tmpTst(): { data: string } {
      return { data: 'You hi me..' };
   }

   async merchantWithAuth({ id }: FindByIdDto) {
      const { data: merchant } = await this.findById({ id });
      const { data: subscription } = await this.subscriptionService.subMonitor({ id });
      return {
         data: { merchant, subscription, isSubActive: subscription?.status === EStatus.Active },
      };
   }

   async loginUser({ id, userId, name, app }: MerchantUserLoginDto) {
      const {
         data: { merchant, subscription, isSubActive },
      } = await this.merchantWithAuth({ id, lean: false });
      const context = await this.moduleRef.resolve(RequestContextService);
      if (![EUserApp.Customer, EUserApp.Partner].includes(app) && !!subscription) {
         const numAllowedUser =
            app === EUserApp.Admin
               ? subscription.extraAdminCount + subscription.subscriptionType.baseAdminCount
               : subscription.extraEmployeeCount + subscription.subscriptionType.baseEmployeeCount;
         const numLoggedInUser = merchant.loggedInUsers.filter(({ app }) => app).length;
         const isSlotLeft = numAllowedUser - numLoggedInUser > 0;
         if (!isSlotLeft) throw new ForbiddenException('No available slot to login');
         merchant.loggedInUsers.push({ app, userId, name });
         await merchant.save({ session: context.get('session') });
      }
      return { data: { merchant, subscription, isSubActive } };
   }

   async createMerchant({ category, ...dto }: CreateMerchantDto) {
      const context = await this.moduleRef.resolve(RequestContextService);
      const repository = await this.getRepository();
      const { data: type } = await this.categoryService.getCategory(category);
      const merchant: Document<unknown, unknown, Merchant> & Merchant = await repository.custom(
         async (model) =>
            new model({
               ...dto,
               status: EStatus.Pending,
               type,
            }),
      );
      return { data: await merchant.save({ session: context.get('session') }) };
   }

   async requestVerification({ id }: FindByIdDto) {
      const repository = await this.getRepository();
      const { data } = await this.findById({ id });
      if (data.verified) throw new BadRequestException('Merchant already verified');
      const code = Math.floor(Math.random() * 1000000).toString();
      const { data: merchant } = await repository.findAndUpdate({
         id: data._id,
         update: { mfa: { code, expireAt: $dayjs().add(1, 'minutes').toDate() } },
      });
      return { data: merchant.mfa };
   }

   async verify({ id, code }: MerchantVerifyDto) {
      const { data: merchant } = await this.findById({ id });
      if (!merchant.mfa) throw new BadRequestException('Request verification code first');
      if ($dayjs().isAfter($dayjs(merchant.mfa.expireAt))) throw new BadRequestException('Expired');
      if (code !== merchant.mfa.code) throw new BadRequestException('Invalid code');
   }
}
