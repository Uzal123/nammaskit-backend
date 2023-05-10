import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateResultInput {
  @Field(() => String)
  _id: string;

  @Field(() => Number)
  obtainedMark: number;
}
