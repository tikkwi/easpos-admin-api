import { REPOSITORY } from '@common/constant';
import { ContextService } from '@common/core/context/context.service';
import { CoreService } from '@common/core/core.service';
import { Repository } from '@common/core/repository';
import { AppService } from '@common/decorator/app_service.decorator';
import { FindByIdDto } from '@common/dto/core.dto';
import { CreateMerchantDto, MerchantServiceMethods } from '@common/dto/merchant.dto';
import { Merchant } from '@common/schema/merchant.schema';
import { ECategory, EStatus } from '@common/utils/enum';
import { forwardRef, Inject } from '@nestjs/common';
import { CategoryService } from '@shared/category/category.service';
import { Document } from 'mongoose';
import { MerchantPurchaseService } from 'src/merchant_purchase/merchant_purchase.service';
import { UserService } from 'src/user/user.service';

@AppService()
export class MerchantService extends CoreService implements MerchantServiceMethods {
   constructor(
      @Inject(REPOSITORY) private readonly repository: Repository<Merchant>,
      @Inject(forwardRef(() => UserService))
      private readonly userService: UserService,
      private readonly categoryService: CategoryService,
      private readonly purchaseService: MerchantPurchaseService,
      protected readonly context: ContextService,
   ) {
      super();
   }

   tmpTst(): { data: string } {
      return { data: 'You hi me..' };
   }

   async getMerchant(dto: FindByIdDto) {
      return await this.repository.findById(dto);
   }

   async merchantWithAuth({ id }: FindByIdDto) {
      const { data: merchant } = await this.repository.findById({ id });
      if (merchant.status.status === EStatus.Active) {
         const { data: isSubActive } = await this.purchaseService.subMonitor({
            id: merchant.activePurchase as any,
            merchantMail: merchant.mails[0],
         });
         if (isSubActive) return { merchant, isSubActive };
      }
      return { merchant: undefined, isSubActive: false };
   }

   async createMerchant({ user: userDto, category, ...dto }: CreateMerchantDto) {
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

      const { data: user } = await this.userService.createUser({
         ...userDto,
         merchantId: merchant.id,
      });

      merchant.owner = user;

      return { data: await merchant.save({ session: this.context.get('session') }) };
   }
}
