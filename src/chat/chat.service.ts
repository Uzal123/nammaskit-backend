import { Product, ProductModel } from './../models/product.model';
import { UserModel } from './../models/user.model';
import { User } from 'src/models/user.model';
import { FetchMessagesInput } from './dto/message.fetch.dto';
import {
  MessageResponse,
  FetchMessagesResponse,
} from './dto/message.response.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatModel } from 'src/models/chat.model';
import { Message, MessageModel } from 'src/models/message.model';
import { RequestService } from 'src/request.service';
import { CreateMessageInput } from './dto/create.message.dto';
import { PubSub } from 'graphql-subscriptions';
import { ChatItem } from './dto/chatItem.dto';
import { Profile, ProfileModel } from 'src/models/profile.model';
import { AllowedMessageStatus } from 'src/common/dto/message.status.enum';
// import { MESSAGE_ADDED } from './dto/events';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserModel>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<ChatModel>,
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageModel>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductModel>,
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileModel>,
    // @Inject(PubSub)
    private pubSub: PubSub,
    private readonly requestService: RequestService,
  ) {}

  public async createMessage(
    input: CreateMessageInput,
  ): Promise<MessageResponse> {
    const response = new MessageResponse();
    const { message, productId, receiver } = input;
    const validationMessage = await this.validateMeesageFetchQuery(
      productId,
      receiver,
    );

    if (validationMessage) {
      response.message = validationMessage;
      response.success = false;
      return response;
    }

    let chat = await this.findChat(receiver, productId);

    if (!chat) {
      chat = await this.createChat(receiver, productId);
    }

    const newMessage = await (
      await this.messageModel.create({
        receiver,
        message,
        product: productId,
        sender: this.requestService.getUserId(),
      })
    ).populate(['sender', 'receiver', 'product']);

    response.data = newMessage;
    response.message = 'message sent';
    response.success = true;
    await this.pubSub.publish(receiver, {
      messageAdded: response,
    });
    return response;
  }

  public async fetchChat(): Promise<ChatItem[]> {
    const userId = this.requestService.getUserId();
    const chats = await this.chatModel
      .aggregate([
        {
          $match: {
            $or: [{ user1: userId }, { user2: userId }],
          },
        },
        // Lookup messages for the chat
        {
          $lookup: {
            from: 'messages',
            let: {
              user1: '$user1',
              user2: '$user2',
              product: '$product',
              userId: userId,
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $or: [
                          { $eq: ['$sender', userId] },
                          { $eq: ['$receiver', userId] },
                        ],
                      },
                      {
                        $eq: ['$product', '$$product'],
                      },
                    ],
                  },
                },
              },
              { $sort: { createdAt: -1 } },
              { $limit: 9 },
              // {
              //   $project: {
              //     _id: 0,
              //     message: 1,
              //   },
              // },
            ],
            as: 'lastMsg',
          },
        },

        // Count the unseen messages for the chat
        {
          $addFields: {
            unseenMsgs: {
              $size: {
                $filter: {
                  input: '$lastMsg',
                  as: 'msg',
                  cond: {
                    if: {
                      $and: [
                        { $eq: ['$msg.status', AllowedMessageStatus.de] },
                        { $eq: ['$msg.receiver', userId] },
                      ],
                    },
                  },
                },
              },
              // $sum: {
              //   $cond: {
              //     if: {
              //       $and: [
              //         { $eq: ['$lastMsg.status', AllowedMessageStatus.de] },
              //         { $eq: ['$lastMsg.receiver', userId] },
              //       ],
              //     },
              //     then: 1,
              //     else: 0,
              //   },
              // },
            },
          },
        },

        {
          $lookup: {
            from: 'users',
            localField: 'user1',
            foreignField: '_id',
            as: 'user1',
          },
        },
        {
          $unwind: '$user1',
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user2',
            foreignField: '_id',
            as: 'user2',
          },
        },
        {
          $unwind: '$user2',
        },
        {
          $lookup: {
            from: 'products',
            localField: 'product',
            foreignField: '_id',
            as: 'product',
          },
        },
        {
          $unwind: '$product',
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'user1._id',
            foreignField: 'user',
            as: 'profile1',
          },
        },
        {
          $unwind: '$profile1',
        },
        {
          $lookup: {
            from: 'profiles',
            localField: 'user2._id',
            foreignField: 'user',
            as: 'profile2',
          },
        },
        {
          $unwind: '$profile2',
        },
        {
          $project: {
            _id: 1,
            user1: '$user1',
            user2: '$user2',
            product: '$product',
            profile1: '$profile1',
            profile2: '$profile2',
            unseenMsgs: 1,
            lastMsg: { $arrayElemAt: ['$lastMsg.message', 0] },
          },
        },
      ])
      .sort({ updatedAt: -1 })
      .exec();

    console.log({ chats });

    return chats;
  }

  public async fetchMessages(
    fetchInput: FetchMessagesInput,
  ): Promise<FetchMessagesResponse> {
    const response = new FetchMessagesResponse();
    const currentUserId = this.requestService.getUserId();
    const { limit, page, productId, peerId } = fetchInput;

    const validationMessage = await this.validateMeesageFetchQuery(
      productId,
      peerId,
    );

    if (validationMessage) {
      response.message = validationMessage;
      response.success = false;
      return response;
    }

    if (page === 1) {
      await this.messageModel.updateMany(
        {
          $or: [
            { sender: currentUserId, receiver: peerId },
            { sender: peerId, receiver: currentUserId },
          ],
          product: productId,
        },
        {
          status: AllowedMessageStatus.de,
        },
      );
    }

    const messages = await this.messageModel
      .find({
        $or: [
          { sender: currentUserId, receiver: peerId },
          { sender: peerId, receiver: currentUserId },
        ],
        product: productId,
      })
      .populate(['sender', 'receiver', 'product'])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    let chat = await this.findChat(peerId, productId);

    if (!chat) {
      chat = await this.createChat(peerId, productId);
    }

    response.data = messages.reverse();
    response.profile = await this.profileModel
      .findOne({ user: peerId })
      .populate('user');
    response.message = 'message sent';
    response.success = true;
    response.currentPage = page;
    response.hasNextPage = messages.length === limit;

    return response;
  }

  private async createChat(
    peerId: string,
    productId: string,
  ): Promise<ChatModel> {
    return await this.chatModel.create({
      user1: this.requestService.getUserId(),
      user2: peerId,
      product: productId,
    });
  }

  private async findChat(
    peerId: string,
    productId: string,
  ): Promise<ChatModel> {
    return await this.chatModel.findOne({
      $or: [
        { user1: this.requestService.getUserId(), user2: peerId },
        { user1: peerId, user2: this.requestService.getUserId() },
      ],
      product: productId,
    });
  }

  private async validateMeesageFetchQuery(
    productId: string,
    peerId: string,
  ): Promise<string | null> {
    // verify if product exists

    const product = await this.productModel.findById(productId);

    if (!product) {
      return "Product doesn't eists";
    }

    //verify if peer exists
    const peer = await this.userModel.findById(peerId);

    if (!peer) {
      return "User doesn't exist";
    }

    return null;
  }

  public messageCreated(): AsyncIterator<unknown, any, undefined> {
    const user = this.requestService.getUserId();
    return this.pubSub.asyncIterator(user.toString());
  }
}
