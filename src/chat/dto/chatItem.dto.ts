import { Chat } from './../../models/chat.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Profile } from 'src/models/profile.model';

@ObjectType()
export class ChatItem extends Chat {
  @Field(() => Profile, { nullable: true })
  profile1: Profile;
  @Field(() => Profile, { nullable: true })
  profile2: Profile;

  @Field(() => String, { nullable: true })
  lastMsg: string;
  @Field(() => Number, { nullable: true })
  unseenMsgs: number;
}
