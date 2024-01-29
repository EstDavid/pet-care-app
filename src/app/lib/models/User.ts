import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

interface Contact extends mongoose.Document{
  phone: string
  email: string
  address: string
  location: {
    lat: Number
    long:Number
  }
}

const contactSchema = new mongoose.Schema<Contact>({
  phone: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  location: {
    lat: {
      type: Number
    },
    long: {
      type: Number
    }
  }
});

export interface User extends mongoose.Document {
  firstname: string;
  surname: string;
  clerkID: string
  role: string
  pfpUrl: string
  messages: Types.ObjectId[]
  stays: Types.ObjectId[]
  petsOwned: Types.ObjectId[]
  petsSitting: Types.ObjectId[]
  contact: Contact
}

const userSchema = new mongoose.Schema<User>({
  firstname: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  clerkID: {
    type: String
  },
  role: {
    type: String,
    enum: ['owner', 'sitter']
  },
  pfpUrl: {
    type: String
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  stays: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Stay'
  }],
  petsOwned: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Pet'
  }],
  petsSitting: [{
    type: Schema.Types.ObjectId,
    // required: true,
    ref: 'Pet'
  }],
  contact: {
    type: contactSchema
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<User>('User', userSchema);