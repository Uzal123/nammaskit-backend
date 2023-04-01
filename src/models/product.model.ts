import { AllowedOfferType } from '../common/dto/offerTypes.enum';
import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { VehicleType } from 'src/common/dto/vehicleTypes.enum';
import { PricedType } from 'src/common/dto/priceType.enum';
import { BikeBrandType } from 'src/common/dto/bike.brand.enum';
import { AllowedFuelType } from 'src/common/dto/fuel.enum';
import { AllowedTransmissionType } from 'src/common/dto/transmission.enum';
import { VehicleCondition } from 'src/common/dto/condition.enum';

@ObjectType()
@Schema({ timestamps: false, versionKey: false, autoIndex: false })
export class ProductImageSchema {
  @Field(() => String)
  @Prop({ required: false })
  key: string;

  @Field(() => String)
  @Prop({ required: false })
  url: string;
}

@ObjectType()
@Schema({ timestamps: false, versionKey: false, autoIndex: false })
export class LocationScheme {
  @Field(() => [Number])
  @Prop({ required: true, index: '2dsphere' })
  coordinates: number[];

  @Field(() => String,{ defaultValue: ''})
  @Prop({ required: true, default: ''})
  location: string;
}

@ObjectType()
@Schema({ timestamps: true })
export class Product {
  @Field(() => String, { description: 'The product id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Field(() => User, { nullable: false })
  createdBy: User ;

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  @Prop({ default: false })
  published: boolean;

  @Field(() => AllowedOfferType, { nullable: false })
  @Prop({ required: true })
  offerType: AllowedOfferType;

  @Field(() => VehicleType, { nullable: false })
  @Prop({ required: true })
  vehicleType: VehicleType;

  @Field(() => BikeBrandType, { nullable: false })
  @Prop({ required: true })
  brand: BikeBrandType;

  @Field(() => [ProductImageSchema], { nullable: false })
  @Prop({ required: true })
  images: ProductImageSchema[];

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  title: string;

  @Field(() => AllowedFuelType, { nullable: false })
  @Prop({ required: true })
  fuleType: AllowedFuelType;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  color: string;

  @Field(() => String, { nullable: false })
  @Prop({ required: true })
  description: string;

  @Field(() => Number, { nullable: false })
  @Prop({ required: true })
  price: number;

  @Field(() => PricedType, { nullable: false })
  @Prop({ required: true })
  priceType: PricedType;

  @Field(() => LocationScheme, { nullable: true })
  @Prop({ required: true })
  location: LocationScheme;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false })
  kmRun: number;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false })
  madeYear: number;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  lotNo: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  milege: string;

  @Field(() => AllowedTransmissionType, { nullable: true })
  @Prop({ required: false })
  transmission: AllowedTransmissionType;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false })
  usedFor: number;

  @Field(() => VehicleCondition, { nullable: true })
  @Prop({ required: false })
  vehicleCondition: VehicleCondition;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false })
  engine: number;

  @Field(() => Date, { description: 'Created At' })
  createdAt?: Date;

  @Prop()
  @Field(() => Date, { description: 'Updated At' })
  updatedAt?: Date;
}

export type ProductModel = Document & Product;

export const ProductSchema = SchemaFactory.createForClass(Product);
