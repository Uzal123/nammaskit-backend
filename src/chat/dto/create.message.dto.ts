import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { User } from 'src/models/user.model';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  receiver: string;

  @Prop({ type: String, ref: User.name })
  @Field(() => String)
  message: string;

  @Prop({ type: String, ref: User.name })
  @Field(() => String)
  productId: string;
}
