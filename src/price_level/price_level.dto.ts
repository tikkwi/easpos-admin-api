import { IsNumber, IsOptional } from 'class-validator';
import { GetApplicablePriceDto } from '@common/dto/service/price_level.dto';

export class GetApplicableSubPriceDto extends GetApplicablePriceDto {
   @IsOptional()
   @IsNumber()
   addedUser?: number;
}
