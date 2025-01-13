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

   tmpTst({ message }: { message: string }) {
      return { data: { message } };
   }

   async merchantWithAuth({ ctx, id }: FindByIdDto) {
      const { data: merchant } = await this.findById({ ctx, id });
      const { data: subscription } = await this.subscriptionService.subMonitor({ ctx, id });
      return {
         data: { merchant, subscription, isSubActive: subscription?.status === EStatus.Active },
      };
   }

   async loginUser({ ctx, merchantId, userId, name, app }: MerchantUserLoginDto) {
      const {
         data: { merchant, subscription, isSubActive },
      } = await this.merchantWithAuth({ ctx, id: merchantId, lean: false });
      if (![EUserApp.Customer, EUserApp.Partner].includes(app) && !!subscription) {
         const numAllowedUser =
            app === EUserApp.Admin
               ? subscription.extraAdminCount + subscription.subscriptionType.baseAdminCount
               : subscription.extraEmployeeCount + subscription.subscriptionType.baseEmployeeCount;
         const numLoggedInUser = merchant.loggedInUsers.filter(({ app }) => app).length;
         const isSlotLeft = numAllowedUser - numLoggedInUser > 0;
         if (!isSlotLeft) throw new ForbiddenException('No available slot to login');
         merchant.loggedInUsers.push({ app, userId, name });
         await merchant.save({ session: ctx.session });
      }
      return { data: { merchant, subscription, isSubActive } };
   }

   async nhtp_createMerchant({ ctx, category, ...dto }: CreateMerchantDto) {
      const repository = await this.getRepository(ctx.connection, ctx.session);
      const { data: type } = await this.categoryService.getCategory({ ctx, ...category });
      const merchant: Document<unknown, unknown, Merchant> & Merchant = await repository.custom(
         async (model) =>
            new model({
               ...dto,
               status: EStatus.Pending,
               type,
            }),
      );
      return { data: await merchant.save({ session: ctx.session }) };
   }

   async requestVerification({ ctx, id }: FindByIdDto) {
      const repository = await this.getRepository(ctx.connection, ctx.session);
      const { data } = await this.findById({ ctx, id });
      if (data.verified) throw new BadRequestException('Merchant already verified');
      const code = Math.floor(Math.random() * 1000000).toString();
      const { data: merchant } = await repository.findAndUpdate({
         id: data._id,
         update: { mfa: { code, expireAt: $dayjs().add(1, 'minutes').toDate() } },
      });
      return { data: merchant.mfa };
   }

   async verify({ ctx, id, code }: MerchantVerifyDto) {
      const { data: merchant } = await this.findById({ ctx, id });
      if (!merchant.mfa) throw new BadRequestException('Request verification code first');
      if ($dayjs().isAfter($dayjs(merchant.mfa.expireAt))) throw new BadRequestException('Expired');
      if (code !== merchant.mfa.code) throw new BadRequestException('Invalid code');
   }
}
