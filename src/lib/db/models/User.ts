import mongoose from 'mongoose';
import {Model, Schema, Types} from 'mongoose';

interface Contact {
  phone?: string;
  email?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
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
  country: {
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

export interface User {
  id?: string;
  _id?: Types.ObjectId;
  firstname?: string;
  surname?: string;
  clerkID?: string;
  role?: string;
  pfpUrl?: string;
  messages?: Types.ObjectId[];
  stays?: Types.ObjectId[];
  petsOwned?: Types.ObjectId[];
  petsSitting?: Types.ObjectId[];
  contact?: Contact;
  sitsDogs?: boolean;
  sitsCats?: boolean;
  sitterDescription?: string;
  maxPets?: string;
  qualifications?: string;
  firstAid?: string;
  insuranceDetails?: string;
}

const userSchema = new mongoose.Schema<User>(
  {
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    clerkID: {
      type: String,
    },
    role: {
      type: String,
      enum: ['owner', 'sitter'],
    },
    // profile picture url
    pfpUrl: {
      type: String,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    stays: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Stay',
      },
    ],
    petsOwned: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Pet',
      },
    ],
    petsSitting: [
      {
        type: Schema.Types.ObjectId,
        // required: true,
        ref: 'Pet',
      },
    ],
    contact: {
      type: contactSchema,
    },
    sitsDogs: {
      type: Boolean,
    },
    sitsCats: {
      type: Boolean,
    },
    sitterDescription: {
      type: String,
    },
    qualifications: {
      type: String,
    },
    firstAid: {
      type: String,
    },
    insuranceDetails: {
      type: String,
    },
    maxPets: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

delete mongoose.models['User']; //!!this is gross but works
const User = mongoose.model<User>('User', userSchema);
export default User;

// const User = (
//   mongoose.models.Users
//     ? mongoose.models.Users
//     : mongoose.model('User', userSchema)
// ) as Model<User>;
// export default User;
