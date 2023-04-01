import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => AllowedRole)
  role: AllowedRole;

  @Field(() => Number)
  phone: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  salt?: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  gender: string;
}
