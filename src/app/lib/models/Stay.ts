import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

export interface Stay extends mongoose.Document {
  from: Date
  to: Date
  sitter: Types.ObjectId
  confirmed: Boolean
  pet: Types.ObjectId[]
  owner: Types.ObjectId
}

const staySchema = new mongoose.Schema<Stay>({
  from: {
    type: Date
  },
  to: {
    type: Date
  },
  sitter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  confirmed: {
    type: Boolean,
    required: true
  },
  pet: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Pet'
  }],
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.models.Stay || mongoose.model<Stay>('Stay', staySchema);