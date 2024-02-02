import mongoose from 'mongoose';
import { Model, Schema, Types } from 'mongoose';
import { User as IUser } from './User'
import { Message as IMessage} from './Message'

export interface Conversation {
  _id: Types.ObjectId
  id: string
  user1: IUser
  user2: IUser
  messages?:IMessage[]
}

const conversationSchema = new Schema<Conversation>(
  {
    user1: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    user2: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]

  }
)

const Conversation = (mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema)) as Model<Conversation>;
export default Conversation;