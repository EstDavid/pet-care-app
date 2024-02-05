import mongoose from 'mongoose';
import { Model, Schema, Types } from 'mongoose';

export interface IMessage {
  _id: Types.ObjectId;
  id: string;
  textContent?: string;
  mediaUrl?: string;
  type?: string;
  sender?: Types.ObjectId;
  messageRead: boolean;
  taggedPets?: Types.ObjectId[];
  createdAt: string;
}

const messageSchema = new Schema<IMessage>(
  {
    textContent: {
      type: String,
    },
    mediaUrl: {
      type: String,
    },
    type: {
      type: String,
      enum: ['text', 'photo', 'video', 'walk'],
    },
    sender: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    messageRead: Boolean,
    taggedPets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = (mongoose.models.Message ||
  mongoose.model('Message', messageSchema)) as Model<IMessage>;
export default Message;
