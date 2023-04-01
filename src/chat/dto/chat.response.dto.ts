import { Field, ObjectType } from '@nestjs/graphql';
import { ChatItem } from './chatItem.dto';

@ObjectType()
export class FetchChatsResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [ChatItem], { defaultValue: [] })
  data: ChatItem[];
}
