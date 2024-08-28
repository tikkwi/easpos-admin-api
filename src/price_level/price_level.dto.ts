import { IsMongoId, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
