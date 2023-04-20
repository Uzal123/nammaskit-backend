import { Field, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@InputType()
export class EachSubjectMarks {
  @Field(() => String)
  @Prop({ required: false })
  subcode: string;

  @Field(() => Number)
  @Prop({ required: false })
  ObtainedMark: number;

  @Field(() => Number)
  @Prop({ required: false, default: 100 })
  fullMark: number;
}
