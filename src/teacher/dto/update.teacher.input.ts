import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { AllowedDepartment } from 'src/common/dto/allowed.departments.enum';
import { AllowedRole } from 'src/common/dto/allowed.roles.enum';

@InputType()
export class UpdateTeacherInput {
  @Field(() => String)
  @Prop({ required: true })
  _id: string;

  @Field(() => AllowedRole, { nullable: true })
  @Prop({ required: false })
  role: AllowedRole | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  designation: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  qualification: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  experience: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  address: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  email: string | null;

  @Field(() => Number, { nullable: true })
  @Prop({ required: false })
  phone: number | null;
}
