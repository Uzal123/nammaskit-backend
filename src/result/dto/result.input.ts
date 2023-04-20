import { Field, InputType } from '@nestjs/graphql';
import { EachSubjectMarks } from './subject.input';

@InputType()
export class CreateResultInput {
  @Field(() => String)
  studentId: string;

  @Field(() => Number)
  semester: number;

  @Field(() => [EachSubjectMarks])
  subjects: EachSubjectMarks[];
}
