import dbConnect from './dbConnect';
import User from './models/User';

export async function getAllUsers () {
  await dbConnect();

  try {
    const users = await User
      .find({})
      .limit(10);

    console.log(users);

  } catch (e) {
    console.error(e);
  }
}