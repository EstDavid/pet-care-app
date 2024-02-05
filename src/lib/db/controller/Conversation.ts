import dbConnect from '../dbConnect';
import Message, { IMessage } from '../models/Message';
import mongoose from 'mongoose';
import Conversation, { IConversation } from '../models/Conversation';

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

export async function getConversationByPair (id1: string, id2: string): Promise<IConversation | undefined | null> {
  await dbConnect();

  try {
    let _id1 = new mongoose.Types.ObjectId(id1);
    let _id2 = new mongoose.Types.ObjectId(id2);
    let conversation = await Conversation.findOne({
      $or: [
        {
          $and: [
            { user1: _id1 },
            { user2: _id2 }
          ]
        },
        {
          $and: [
            { user1: _id2 },
            { user2: _id1 }
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

export async function createConversation (id1: string, id2: string): Promise<IConversation | undefined> {
  try {
    let _id1 = new mongoose.Types.ObjectId(id1);
    let _id2 = new mongoose.Types.ObjectId(id2);
    const conversation = await Conversation.create({
      user1: _id1,
      user2: _id2
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

export async function getUnreadMessages (userId: string) {
  try {
    const messages = await Conversation.find({
      $or: [{ user1: userId }, { user2: userId }],
    }).populate('messages');

    console.log(messages);

    // .where('messages').;

    // const messages = await Conversation.findOneAndUpdate(
    //   { _id: id },
    //   { $pull: { messages: message._id } },
    //   { new: true }
    // );

    if (!messages) {
      throw new Error('Messages is undefined');
    }

    return messages;
  } catch (error) {
    console.error(error);
  }
}

