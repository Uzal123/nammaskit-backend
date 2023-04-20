import { Result } from 'src/models/result.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ResultsResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Result], { nullable: true })
  results: Result[];
}
