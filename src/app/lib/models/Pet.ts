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

export interface Pet extends mongoose.Document {
  name: string
  owner: Types.ObjectId,
  species: String,
  breed: String
  pfpUrl:String
  notes: String
  sex: String
  fixed:  Boolean
  sitter: Types.ObjectId,
  vet: Contact
}

export const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  species: {
    type: String,
    enum: ['dog', 'cat']
  },
  breed: {
    type: String
  },
  pfpUrl: {
    type: String
  },
  notes: {
    type: String
  },
  sex: {
    type: String
  },
  fixed: {
    type: Boolean
  },
  sitter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vet: {
    type: contactSchema
  }
}, {
  timestamps: true
});

petSchema.add({name: 'string'})

export default mongoose.models.Pet || mongoose.model<Pet>('Pet', petSchema);