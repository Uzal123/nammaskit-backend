import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class CreateSubjectInput {
  @Field(() => String)
  @Prop({ required: true })
  subjectName: string;

  @Field(() => String)
  @Prop({ required: true })
  department: string;

  @Field(() => String)
  @Prop({ required: true })
  scheme: string;

  @Field(() => Number)
  @Prop({
    required: true,
  })
  semester: number;

  @Field(() => String)
  @Prop({ required: true, unique: true })
  subjectCode: string;

  @Field(() => String)
  @Prop({ required: false })
  subjectType: string;

  @Field(() => [String], { nullable: true })
  @Prop({ required: false })
  teachers: string[];

  @Field(() => Number)
  @Prop({ required: true })
  subjectCredits: number;

  @Field(() => String)
  @Prop({ required: false })
  subjectDescription: string;
}
