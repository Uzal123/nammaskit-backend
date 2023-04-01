import { Product, ProductSchema } from './../models/product.model';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Chat, ChatSchema } from 'src/models/chat.model';
import { Message, MessageSchema } from 'src/models/message.model';
import { User, UserSchema } from 'src/models/user.model';
import { RequestService } from 'src/request.service';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Profile, ProfileSchema } from 'src/models/profile.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [ChatResolver, ChatService, RequestService, PubSub],
  exports: [ChatResolver],
})
export class ChatModule {}
