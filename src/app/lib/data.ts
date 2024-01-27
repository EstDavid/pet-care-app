import dbConnect from './dbConnect';
import Movie from './models/Movie';

export async function getMovies () {
  await dbConnect();

  try {
    const movies = await Movie
      .find({})
      .sort({ metacritic: -1 })
      .limit(10)
      .select('title');

    console.log(movies);

  } catch (e) {
    console.error(e);
  }
}