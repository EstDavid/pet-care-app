import mongoose from 'mongoose';
import {Model, Schema, Types} from 'mongoose';

export interface Update {
  createdAt: string | number | Date;
  _id: Types.ObjectId;
  id: string;
  comment?: string;
  mediaUrl?: string[];
  mediaType?: string;
}

const updateSchema = new Schema<Update>(
  {
    mediaUrl: {
      type: [String],
    },
    mediaType: {
      type: String,
      enum: ['photo', 'video'],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Update = (mongoose.models.Update ||
  mongoose.model('Update', updateSchema)) as Model<Update>;
export default Update;
