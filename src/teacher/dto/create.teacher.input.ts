import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AllowedDepartment } from 'src/common/dto/allowed.departments.enum';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

@InputType()
export class CreateTeacherInput {
  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  firstName: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  lastName: string;

  @Field(() => String, { description: 'The user full Name' })
  @Prop({ required: true })
  gender: string;

  @Field(() => AllowedRole, {
    description: 'The user full Name',
    defaultValue: AllowedRole.fa,
  })
  @Prop({ default: AllowedRole.st, required: false })
  role: AllowedRole;

  @Field(() => String, { description: 'Email is required', nullable: true })
  @Prop({ required: false })
  email: string;

  @Field(() => Number, { description: 'Phone is required', nullable: true })
  @Prop({ required: false })
  phone: number;

  @Field(() => String)
  @Prop({ required: false })
  department: string;

  @Field(() => String)
  @Prop({ required: true })
  designation: string;

  @Field(() => String)
  @Prop({ required: true })
  qualification: string;

  @Field(() => String)
  @Prop({ required: true })
  experience: string;

  @Field(() => String)
  @Prop({ required: true })
  address: string;
}
