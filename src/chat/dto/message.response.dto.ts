import { Message } from 'src/models/message.model';
import { ObjectType, Field } from '@nestjs/graphql';
import { Profile } from 'src/models/profile.model';
import { FetchResponse } from 'src/common/dto/fetch.response.dto';

@ObjectType()
export class MessageResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => Message, { nullable: true })
  data: Message;
}

@ObjectType()
export class FetchMessagesResponse extends FetchResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String)
  message: string;
  @Field(() => [Message], { defaultValue: [] })
  data: Message[];
  @Field(() => Profile, { nullable: true })
  profile: Profile;
}

