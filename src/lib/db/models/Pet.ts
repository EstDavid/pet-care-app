import mongoose from 'mongoose';
import {Model, Schema, Types} from 'mongoose';

interface Contact {
  name?: string;
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
  name: {
    type: String,
  },
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
  owner: Types.ObjectId;
  species: String;
  name: string;
  age: String;
  breed: String;
  sex: String;
  pfpUrl: String;
  notes: String;
  medication: String;
  allergies: String;
  vaccinations: String;
  sprayed: Boolean;
  emergencyInstructions: String;
  insurance: String;
  microchip: String;
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
      required: true,
    },
    age: {
      type: String,
    },
    breed: {
      type: String,
    },
    gender: {
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
    medication: {
      type: String,
    },
    allergies: {
      type: String,
    },
    vaccinations: {
      type: String,
    },
    sprayed: {
      type: Boolean,
    },
    emergencyInstructions: {
      type: String,
    },
    insurance: {
      type: String,
    },
    microchip: {
      type: String,
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
