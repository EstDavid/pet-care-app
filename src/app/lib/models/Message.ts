import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

export interface Message extends mongoose.Document {
  textContent: string
  mediaUrl: string
  type: string
  sender: Types.ObjectId
  receiver: Types.ObjectId
  taggedPets: Types.ObjectId[]
}

const messageSchema = new Schema<Message>({
  textContent: {
    type: String
  },
  mediaUrl: {
    type: String
  },
  type: {
    type: String,
    enum: ['text', 'photo', 'video', 'walk']
  },
  sender: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  taggedPets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }]
}, {
  timestamps: true
});

export default mongoose.models.Message || mongoose.model<Message>('Message', messageSchema);