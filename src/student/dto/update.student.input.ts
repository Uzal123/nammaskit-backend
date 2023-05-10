import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UpdateStudentInput {
  @Field(() => String)
  @Prop({ required: true })
  _id: string;

  @Field(() => String, { nullable: true })
  semester: string | null;

  @Field(() => String, { nullable: true })
  currentAddress: string | null;

  @Field(() => Date, { nullable: true })
  dob: Date | null;

  @Field(() => String, { nullable: true })
  category: string | null;

  @Field(() => Boolean, { nullable: true })
  isEligible: boolean | null;

  @Field(() => String, { nullable: true })
  fatherName: string | null;

  @Field(() => String, { nullable: true })
  motherName: string | null;

  @Field(() => String, { nullable: true })
  parentPhone: string | null;

  @Field(() => String, { nullable: true })
  parentOccupation: string | null;

  @Field(() => String, { nullable: true })
  anualIncome: string | null;

  @Field(() => String, { nullable: true })
  entranceExamMarks: string | null;

  @Field(() => String, { nullable: true })
  parmanentAddress: string | null;

  @Field(() => String, { nullable: true })
  course: string | null;

  @Field(() => String, { nullable: true })
  proctor: string | null;
}
