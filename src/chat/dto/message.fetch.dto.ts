import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FetchMessagesInput {
  @Field(() => Number)
  page: number;

  @Field(() => Number)
  limit: number;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  peerId: string;
}
