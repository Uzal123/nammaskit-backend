import { AllowedMessageStatus } from './../common/dto/message.status.enum';
import { User } from './user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Schema as MongooseSchema } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';

@ObjectType()
@Schema({ timestamps: true })
export class Message {
  @Field(() => String, { description: 'The profileId id', nullable: false })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  sender: User | string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Field(() => User)
  receiver: User | string;

  @Prop({ type: String, ref: User.name })
  @Field(() => String)
  message: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  @Field(() => Product, { nullable: false })
  product: Product | string;

  @Prop({ default: AllowedMessageStatus.de })
  @Field(() => AllowedMessageStatus, {
    nullable: true,
    defaultValue: AllowedMessageStatus.de,
  })
  status: AllowedMessageStatus;
}

export type MessageModel = Document & Message;

export const MessageSchema = SchemaFactory.createForClass(Message);
