import { BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { CategoryService } from '@common/service/category/category.service';
import { Document } from 'mongoose';
import { MerchantPurchaseService } from '@app/subscription/subscription.service';
import { ConfigService } from '@nestjs/config';
import { MailService } from '@common/service/mail/mail.service';
import { AppService } from '@common/decorator/app_service.decorator';
import { CoreService } from '@common/core/service/core.service';
import {
   CreateMerchantDto,
   MerchantServiceMethods,
   MerchantUserLoginDto,
   MerchantVerifyDto,
} from '@common/dto/service/merchant.dto';
import { ContextService } from '@common/core/context/context.service';
import { AppRedisService } from '@common/core/app_redis/app_redis.service';
import { PRE_END_SUB_MAIL, REPOSITORY } from '@common/constant';
import { Repository } from '@common/core/repository';
import { FindByIdDto } from '@common/dto/global/core.dto';
import { ECategory, EMail, EStatus, ESubscription, EUserApp } from '@common/utils/enum';
import { $dayjs } from '@common/utils/datetime';

@AppService()
export class MerchantService extends CoreService implements MerchantServiceMethods {
   constructor(
      protected readonly context: ContextService,
      private readonly config: ConfigService,
      private readonly db: AppRedisService,
      private readonly mailService: MailService,
      private readonly categoryService: CategoryService,
      private readonly purchaseService: MerchantPurchaseService,
      @Inject(REPOSITORY) private readonly repository: Repository<Merchant>,
   ) {
      super();
   }

   tmpTst(): { data: string } {
      return { data: 'You hi me..' };
   }

   async getMerchant({ id, errorOnNotFound = true }: FindByIdDto) {
      return await this.repository.findOne({ id, errorOnNotFound });
   }

   async merchantWithAuth({ id, lean }: FindByIdDto) {
      const { data: merchant } = await this.repository.findOne({ id, options: { lean } });
      if (merchant.status.status === EStatus.Active) {
         const {
            data: { purchases, isSubActive, subEnd },
         } = await this.purchaseService.subMonitor({ ids: merchant.activePurchases as any });

         merchant.activePurchases = purchases;
         let preSubEnd, isPreSubEnd;
         if (isSubActive && subEnd) {
            preSubEnd = $dayjs(subEnd).add(this.config.get(PRE_END_SUB_MAIL), 'days');
            isPreSubEnd = $dayjs().isAfter(preSubEnd);
         }

         if (
            (subEnd && !isSubActive && !merchant.sentSubEndMail) ||
            (isPreSubEnd && !merchant.sentPreSubEndMail)
         ) {
            this.mailService.sendMail({
               mail: merchant.mail,
               type: isSubActive
                  ? EMail.MerchantPreSubscriptionExpire
                  : EMail.MerchantSubscriptionExpire,
               expirePayload: isSubActive ? undefined : { expireDate: subEnd },
               preExpirePayload: isSubActive ? { expireDate: preSubEnd } : undefined,
            });
         }

         if (isSubActive)
            return {
               data: {
                  merchant,
                  isSubActive,
               },
            };
      }
      return {
         data: {
            merchant,
            isSubActive: false,
         },
      };
   }

   async loginUser({ id, userId, name, app }: MerchantUserLoginDto) {
      const { data } = await this.merchantWithAuth({ id, lean: true });
      const purchase = data.merchant.activePurchases[0];
      const loggedInUsers = data.merchant.loggedInUsers;

      if (purchase?.type !== ESubscription.Offline) {
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
      const { data: type } = category.id
         ? await this.categoryService.getCategory({ id: category.id })
         : await this.categoryService.createCategory({
              name: category.name,
              type: ECategory.Merchant,
           });

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
      const { data } = await this.getMerchant({ id });
      if (data.verified) throw new BadRequestException('Merchant already verified');
      const code = Math.floor(Math.random() * 1000000).toString();
      const { data: merchant } = await this.repository.findAndUpdate({
         id: data._id,
         update: { mfa: { code, expireAt: $dayjs().add(1, 'minutes').toDate() } },
      });
      return { data: merchant.mfa };
   }

   async verify({ id, code }: MerchantVerifyDto) {
      const { data: merchant } = await this.getMerchant({ id });
      if (!merchant.mfa) throw new BadRequestException('Request verification code first');
      if ($dayjs().isAfter($dayjs(merchant.mfa.expireAt))) throw new BadRequestException('Expired');
      if (code !== merchant.mfa.code) throw new BadRequestException('Invalid code');
   }
}
