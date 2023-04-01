import { AllowedOfferType } from 'src/common/dto/offerTypes.enum';
import { Field, InputType } from '@nestjs/graphql';
import { VehicleType } from 'src/common/dto/vehicleTypes.enum';

@InputType()
export class FetchProductInput {
  @Field(() => [AllowedOfferType], {
    nullable: false,
  })
  offerType: AllowedOfferType[];

  @Field(() => [VehicleType], { nullable: false, defaultValue: Object.keys(VehicleType) })
  vehicleType: VehicleType[];

  @Field(() => Number, {
    nullable: false,
    defaultValue: 1,
  })
  pageNo: number;

  @Field(() => Number, {
    nullable: false,
    defaultValue: 10,
  })
  count: number;

  @Field(() => String, {
    nullable: true,
  })
  search: string;
}
