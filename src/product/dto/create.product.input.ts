import { Field, InputType } from '@nestjs/graphql';
import { BikeBrandType } from 'src/common/dto/bike.brand.enum';
import { VehicleCondition } from 'src/common/dto/condition.enum';
import { AllowedFuelType } from 'src/common/dto/fuel.enum';
import { PricedType } from 'src/common/dto/priceType.enum';
import { AllowedTransmissionType } from 'src/common/dto/transmission.enum';
import { VehicleType } from 'src/common/dto/vehicleTypes.enum';
import { ImageItemSchema } from 'src/upload/dto/images.input';
import { AllowedOfferType } from 'src/common/dto/offerTypes.enum';

@InputType()
export class LocationInputScheme {
  @Field(() => [Number])
  coordinates: number[];

  @Field(() => String)
  location: string;
}

@InputType()
export class CreateRentProductInput {
  @Field(() => VehicleType, { nullable: false })
  vehicleType: VehicleType;

  @Field(() => AllowedOfferType, { nullable: false })
  offerType: AllowedOfferType;

  @Field(() => String, { nullable: false })
  title: string;

  @Field(() => BikeBrandType, { nullable: false })
  brand: BikeBrandType;

  @Field(() => AllowedFuelType, { nullable: false })
  fuleType: AllowedFuelType;

  @Field(() => String, { nullable: false })
  color: string;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Number, { nullable: false })
  price: number;

  @Field(() => LocationInputScheme, { nullable: false })
  location: LocationInputScheme;

  @Field(() => PricedType, { nullable: false })
  priceType: PricedType;

  @Field(() => [ImageItemSchema], { nullable: false })
  images: ImageItemSchema[];
}

@InputType()
export class CreateSellProductInput {
  @Field(() => String)
  title: string;

  @Field(() => AllowedOfferType, { nullable: false })
  offerType: AllowedOfferType;

  @Field(() => VehicleType, { nullable: false })
  vehicleType: VehicleType;

  @Field(() => BikeBrandType, { nullable: false })
  brand: BikeBrandType;

  @Field(() => AllowedFuelType, { nullable: false })
  fuleType: AllowedFuelType;

  @Field(() => LocationInputScheme, { nullable: false })
  location: LocationInputScheme;

  @Field(() => String, { nullable: false })
  color: string;

  @Field(() => Number, { nullable: false })
  madeYear: number;

  @Field(() => VehicleCondition, { nullable: false })
  vehicleCondition: VehicleCondition;

  @Field(() => Number, { nullable: false })
  kmRun: number;

  @Field(() => String, { nullable: false })
  lotNo: string;

  @Field(() => String, { nullable: false })
  milege: string;

  @Field(() => AllowedTransmissionType, { nullable: false })
  transmission: AllowedTransmissionType;

  @Field(() => PricedType, { nullable: false })
  priceType: PricedType;

  @Field(() => Number, { nullable: false })
  usedFor: number;

  @Field(() => Number, { nullable: false })
  engine: number;

  @Field(() => String, { nullable: false })
  description: string;

  @Field(() => Number, { nullable: false })
  price: number;

  @Field(() => [ImageItemSchema], { nullable: false })
  images: ImageItemSchema[];
}

// export const ResultUnion = createUnionType({
//   name: 'ResultUnion',
//   types: () => [CreateRentProductInput, CreateSellProductInput] as const,
// });

// @InputType()
// export class CreateProductInput {
//   @Field(() => InputUnion)
//   title: InputUnion;
// }

// export const CreateProductInput = UnionInputType({
//   name: 'CreateProductInput',
//   inputTypes: [CreateRentProductInput, CreateSellProductInput], //an object can be used instead to query by names other than defined in these types
// });
