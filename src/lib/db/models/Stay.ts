import mongoose from 'mongoose';
import { Model, Schema, Types } from 'mongoose';
import { User } from './User';
import { Pet } from './Pet';

export interface Stay {
  _id: Types.ObjectId;
  id: string;
  from: Date;
  to: Date;
  sitter: Types.ObjectId;
  confirmed: Boolean;
  pet: Types.ObjectId[];
  owner: Types.ObjectId;
}

export interface FullStay {
  _id: Types.ObjectId;
  id: string;
  from: Date;
  to: Date;
  sitter: Types.ObjectId;
  confirmed: Boolean;
  pet: Pet[];
  owner: User;
}



const staySchema = new mongoose.Schema<Stay>(
  {
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    sitter: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    confirmed: {
      type: Boolean,
      required: true,
    },
    pet: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Pet',
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Stay = (
  mongoose.models.Stay
    ? mongoose.models.Stay
    : mongoose.model('Stay', staySchema)
) as Model<Stay>;
export default Stay;
