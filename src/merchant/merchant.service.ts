import { BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { CategoryService } from '@common/service/category/category.service';
import { Document } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/service/core.service';
import {
   CreateMerchantDto,
   MerchantServiceMethods,
   MerchantUserLoginDto,
   MerchantVerifyDto,
} from '@common/dto/shared/merchant.dto';
import { ContextService } from '@common/core/context/context.service';
import { REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/global/core.dto';
import { EStatus, ESubscription, EUserApp } from '@common/utils/enum';
import { $dayjs } from '@common/utils/datetime';
import { AppPurchaseService } from '@app/purchase/purchase.service';

@AppService()
export class MerchantService extends CoreService<Merchant> implements MerchantServiceMethods {
   constructor(
      protected readonly context: ContextService,
      private readonly config: ConfigService,
      private readonly categoryService: CategoryService,
      private readonly purchaseService: AppPurchaseService,
      @Inject(REPOSITORY) protected readonly repository: Repository<Merchant>,
   ) {
      super();
   }

   tmpTst(): { data: string } {
      return { data: 'You hi me..' };
   }

   async merchantWithAuth({ id }: FindByIdDto) {
      const { data: merchant } = await this.findById({ id, errorOnNotFound: true });

      const isSubActive =
         merchant.status.status === EStatus.Active
            ? (await this.purchaseService.subMonitor({ id: merchant.id })).data
            : false;

      return { data: { merchant, isSubActive } };
   }

   async loginUser({ id, userId, name, app }: MerchantUserLoginDto) {
      const { data } = await this.merchantWithAuth({ id, lean: true });
      const purchase = data.merchant.activePurchases[0];
      const loggedInUsers = data.merchant.loggedInUsers;

      if (purchase?.type.type !== ESubscription.Offline) {
         const isSellerApp = app === EUserApp.Seller;
         const isAdminLoggedIn = loggedInUsers.some(({ app }) => app === EUserApp.Admin);
         const availableSlots = purchase.numUser - loggedInUsers.length;
         if (availableSlots <= 0 || (availableSlots === 1 && isSellerApp && !isAdminLoggedIn))
            throw new ForbiddenException('No Available slot to login');
      }

      data.merchant.loggedInUsers.push({ app, userId, name });
      await data.merchant.save({ session: this.context.get('session') });
      return { data };
   }

   async createMerchant({ category, ...dto }: CreateMerchantDto) {
      const { data: type } = await this.categoryService.getCategory(category);

      const merchant: Document<unknown, unknown, Merchant> & Merchant =
         await this.repository.custom(
            async (model) =>
               new model({
                  ...dto,
                  status: EStatus.Pending,
                  type,
               }),
         );

      return { data: await merchant.save({ session: this.context.get('session') }) };
   }

   async requestVerification({ id }: FindByIdDto) {
      const { data } = await this.findById({ id });
      if (data.verified) throw new BadRequestException('Merchant already verified');
      const code = Math.floor(Math.random() * 1000000).toString();
      const { data: merchant } = await this.repository.findAndUpdate({
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
