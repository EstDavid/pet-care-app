import mongoose from 'mongoose';
import { Schema, Types } from 'mongoose';

interface Contact{
  phone?: string
  email?: string
  address?: string
  location?: {
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

export interface User {
  id?:string
  _id?: Types.ObjectId
  email: string
  firstname: string
  surname: string
  clerkID?: string
  role?: string
  pfpUrl?: string
  messages?: Types.ObjectId[]
  stays?: Types.ObjectId[]
  petsOwned?: Types.ObjectId[]
  petsSitting?: Types.ObjectId[]
  contact?: Contact
}

const userSchema = new mongoose.Schema<User>({
  email :{
    type:String
  },
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

const User = mongoose.model<User>('User', userSchema);

export default User;
