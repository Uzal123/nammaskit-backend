import { Field, InputType } from '@nestjs/graphql';
import { ResultType } from 'src/common/dto/result.type.enum';

@InputType()
export class CreateResultInput {
  @Field(() => String)
  usn: string;

  @Field(() => Number)
  obtainedMark: number;

  @Field(() => ResultType)
  resultType: ResultType;

  @Field(() => String)
  subjectCode: string;

  @Field(() => Number)
    fullMark: number;
}
