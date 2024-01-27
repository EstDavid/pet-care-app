import mongoose from 'mongoose';

export interface Movies extends mongoose.Document {
  title: string;
  genres: string[];
  poster: string;
  year: number;
}

const MovieSchema = new mongoose.Schema<Movies>({
  title: {

    type: String,
  },
  genres: {

    type: [String],
  },
  poster: {

    type: String,
  },
  year: {

    type: Number,
  },
});

export default mongoose.models.Movie || mongoose.model<Movies>("Movie", MovieSchema);