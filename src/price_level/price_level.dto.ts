import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { AppCurrency } from '@app/currency/currency.schema';
import { Category } from '@common/schema/category.schema';
import { AppPriceLevel } from '@app/price_level/price_level.schema';

export class GetApplicablePriceLevelDto {
   @IsMongoId()
   currencyId: string;

   @IsMongoId()
   paymentMethodId: string;

   @IsMongoId()
   subscriptionId: string;

   @IsOptional()
   @IsNotEmpty()
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
