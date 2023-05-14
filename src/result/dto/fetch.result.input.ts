import { Field, InputType } from '@nestjs/graphql';
import { ResultType } from 'src/common/dto/result.type.enum';

@InputType()
export class FetchResultInput {
  @Field(() => [ResultType])
  resultType: ResultType[];

  @Field(() => Number)
  semester: number;

  @Field(() => String)
  studentId: string;
}
