import { IsNumber, IsOptional } from 'class-validator';
import { AppCurrency } from '@app/currency/currency.schema';
import { Category } from '@common/schema/category.schema';
import { AppPriceLevel } from '@app/price_level/price_level.schema';
import { GetApplicablePriceLevelDto } from '@common/dto/service/price_level.dto';

export class GetApplicableSubscriptionPriceLevelDto extends GetApplicablePriceLevelDto {
   @IsOptional()
   @IsNumber()
   addedUser?: number;
}

//NOTE: doc instead of id and no validation becz of inter service communication
export class GetLevelAllowanceDto {
   currency: AppCurrency;
   paymentMethod: Category;
   level: AppPriceLevel;
   price: number;
}
