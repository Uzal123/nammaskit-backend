import { FetchMessagesInput } from './dto/message.fetch.dto';
import { RequestService } from './../request.service';
import {
  MessageResponse,
  FetchMessagesResponse,
} from './dto/message.response.dto';
import { UseGuards } from '@nestjs/common';
import { CreateMessageInput } from './dto/create.message.dto';
import { ChatService } from './chat.service';
import { Mutation, Resolver, Query, Args, Subscription } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';
import { Chat } from 'src/models/chat.model';
import { ChatItem } from './dto/chatItem.dto';
// import { MESSAGE_ADDED } from './dto/events';
// import MessagePayload from 'src/types/message.payload.types';
@Resolver()
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly requestService: RequestService,
  ) {}
  @Mutation(() => MessageResponse)
  @UseGuards(AuthGuard)
  async sendMessage(
    @Args('messageInput', { type: () => CreateMessageInput })
    messageInput: CreateMessageInput,
  ) {
    return this.chatService.createMessage(messageInput);
  }

  @Query(() => FetchMessagesResponse, {
    name: 'fetchMessages',
    description: 'fetchMessages',
  })
  @UseGuards(AuthGuard)
  async login(
    @Args('fetchMessageInput', { type: () => FetchMessagesInput })
    fetchMessageInput: FetchMessagesInput,
  ) {
    return this.chatService.fetchMessages(fetchMessageInput);
  }

  @Query(() => [ChatItem], {
    name: 'fetchChat',
    description: 'fetchMessages',
  })
  @UseGuards(AuthGuard)
  async fetchChat() {
    return this.chatService.fetchChat();
  }

  @Subscription(() => MessageResponse, {
    // async filter(this: ChatResolver, payload: MessagePayload) {
    //   console.log(
    //     this.requestService.getUserId().toString(),
    //     payload.messageAdded.data.receiver.toString(),
    //   );
    //   return (
    //     this.requestService.getUserId().toString() ===
    //     payload.messageAdded.data.receiver.toString()
    //   );
    // },
  })
  @UseGuards(AuthGuard)
  messageAdded() {
    // return this.pubSub.asyncIterator(MESSAGE_ADDED);
    return this.chatService.messageCreated();
  }
}
