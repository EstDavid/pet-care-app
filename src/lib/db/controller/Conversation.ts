import dbConnect from '../dbConnect';
import Message, { IMessage } from '../models/Message';
import mongoose, { Types } from 'mongoose';
import Conversation, { IConversation } from '../models/Conversation';
import User from '../models/User';

export async function getConversationById (id: string): Promise<IConversation | undefined> {
  await dbConnect();

  try {
    let _id = new mongoose.Types.ObjectId(id);
    let conversation = await Conversation.findOne({ _id })
      .populate({ path: 'messages', model: Message });

    if (conversation === undefined || conversation === null) {
      throw new Error('cannot find conversation by that ID');
    }

    return conversation;
  } catch (e) {
    console.error(e);
  }
}

export async function getConversationByPair (id1: Types.ObjectId, id2: Types.ObjectId): Promise<IConversation | undefined | null> {
  await dbConnect();

  try {
    let conversation = await Conversation.findOne({
      $or: [
        {
          $and: [
            { user1: id1 },
            { user2: id2 }
          ]
        },
        {
          $and: [
            { user1: id2 },
            { user2: id1 }
          ]
        },
      ]
    })
      .populate({ path: 'messages', model: Message });

    return conversation;
  } catch (e) {
    console.error(e);
  }
}

export async function createConversation (id1: Types.ObjectId, id2: Types.ObjectId): Promise<IConversation | undefined> {
  try {
    const conversation = await Conversation.create({
      user1: id1,
      user2: id2
    });

    return conversation;
  } catch (error) {
    console.error(error);
  }
}

export async function postMessageToConversation (id: string, message: IMessage): Promise<IConversation | undefined> {
  try {
    const newMessage = await Message.create(message);

    const conversation = await Conversation.findOneAndUpdate(
      { _id: id },
      { $push: { messages: newMessage._id } },
      { new: true }
    );

    return conversation?.populate({ path: 'messages', model: Message });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMessageFromConversation (id: string, message: IMessage): Promise<IConversation | undefined> {
  try {
    await Message.findByIdAndDelete(message._id);

    const conversation = await Conversation.findOneAndUpdate(
      { _id: id },
      { $pull: { messages: message._id } },
      { new: true }
    );

    return conversation?.populate({ path: 'messages', model: Message });
  } catch (error) {
    console.error(error);
  }
}

export async function getConversationsByUser (userId: Object) {
  try {
    const messages = await Conversation.find({
      $or: [{ user1: userId }, { user2: userId }]
    })
      .populate({
        path: 'user1',
        model: User
      })
      .populate({
        path: 'user2',
        model: User
      })
      .populate({
        path: 'messages',
        model: Message
      })
      ;

    if (!messages) {
      throw new Error('Messages is undefined');
    }

    return messages;
  } catch (error) {
    console.error(error);
  }
}

export async function getUnreadMessages (userId: Object) {
  try {
    const conversations = await Conversation.find({
      $or: [{ user1: userId }, { user2: userId }]
    })
      .populate({
        path: 'messages',
        match: { messageRead: { $ne: true } },
        model: Message
      });

    return conversations.filter(conversation => {
      return conversation.messages.length > 0;
    });
  } catch (error) {
    console.error(error);
  }
}

export async function setReadMessages (messages: IMessage[]): Promise<boolean | undefined> {
  try {
    const messagesIds = messages.map(message => message._id);

    await Message.updateMany(
      { _id: { $in: messagesIds } },
      { messageRead: true },
    );

    return;
  } catch (error) {
    console.error(error);
  }
}

