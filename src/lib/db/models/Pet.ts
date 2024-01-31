import mongoose from 'mongoose';
import { Model, Schema, Types } from 'mongoose';

interface Contact {
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  postcode?: string;
  location?: {
    lat: Number;
    long: Number;
  };
}

const contactSchema = new mongoose.Schema<Contact>({
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postcode: {
    type: String,
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

export interface Pet {
  id: string;
  _id: Types.ObjectId;
  name: string;
  owner: Types.ObjectId;
  species: String;
  breed: String;
  pfpUrl: String;
  notes: String;
  sex: String;
  fixed: Boolean;
  sitter?: Types.ObjectId;
  vet: Contact;
}

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    species: {
      type: String,
      enum: ['dog', 'cat'],
    },
    breed: {
      type: String,
    },
    pfpUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
    sex: {
      type: String,
    },
    fixed: {
      type: Boolean,
    },
    sitter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    vet: {
      type: contactSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = (
  mongoose.models.Pet ? mongoose.models.Pet : mongoose.model('Pet', petSchema)
) as Model<Pet>;

export default Pet;
