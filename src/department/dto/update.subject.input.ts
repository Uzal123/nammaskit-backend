import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class UpdateSubjectInput {
  @Field(() => String)
  @Prop({ required: true })
  _id: string;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  subjectName: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: true })
  subjectCode: string | null;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  subjectType: string;

  @Field(() => Number, { nullable: true })
  @Prop({ required: true })
  subjectCredits: number;

  @Field(() => String, { nullable: true })
  @Prop({ required: false })
  subjectDescription: string;
}
