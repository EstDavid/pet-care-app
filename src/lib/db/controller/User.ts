import dbConnect from '../dbConnect';
import User, {User as IUser} from '../models/User';
import Pet, {Pet as IPet} from '../models/Pet';
import Stay from '../models/Stay';
import Message, {IMessage} from '../models/Message';
import mongoose, {Types} from 'mongoose';

export async function getAllUsers(): Promise<IUser[] | undefined> {
  await dbConnect();

  try {
    const users = await User.find({}).limit(10);

    return users;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserById(id: string): Promise<IUser | undefined> {
  await dbConnect();

  try {
    let _id = new mongoose.Types.ObjectId(id);
    let user = await User.findOne({_id})
      .populate({path: 'petsOwned', model: Pet})
      .populate({path: 'messages', model: Message})
      .populate({path: 'stays', model: Stay});

    // console.log(user);

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }

    return user;
  } catch (e) {
    console.error(e);
  }
}
export async function getUserByClerkId(clerkID: string): Promise<IUser | undefined> {
  await dbConnect();

  try {
    let user = await User.findOne({clerkID})
      .populate({path: 'petsOwned', model: Pet})
      .populate({path: 'messages', model: Message})
      .populate({path: 'stays', model: Stay});

    if (user === undefined || user === null) {
      return undefined;
    }

    return user;
  } catch (e) {
    console.error(e);
  }
}

export async function checkUserRole(clerkID: string): Promise<string | undefined> {
  await dbConnect();

  try {
    let user = await User.findOne({clerkID});

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }

    return user.role;
  } catch (e) {
    console.error(e);
  }
}

export async function getPetsOwnedByUser(clerkID: string): Promise<IPet[] | undefined> {
  await dbConnect();

  try {
    let user = await User.findOne({clerkID})
      .populate<{
        petsOwned: IPet[];
      }>({path: 'petsOwned', model: Pet})
      .populate({path: 'messages', model: Message})
      .populate({path: 'stays', model: Stay});

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }

    return user.petsOwned;
  } catch (e) {
    console.error(e);
  }
}

export async function createUserByClerkId({
  clerkID,
  firstname,
  surname,
}: {
  clerkID: string;
  firstname: string;
  surname: string;
}): Promise<IUser | undefined> {
  await dbConnect();

  try {
    const user = await User.findOne({clerkID});

    if (user) {
      throw new Error('user already exists');
    }

    const newUser = await User.create({
      clerkID,
      firstname,
      surname,
      messages: [],
      stays: [],
      petsOwned: [],
      petsSitting: [],
    });

    return newUser;
  } catch (e) {
    console.error(e);
  }
}

export async function getPetsSatByUser(
  id: string
): Promise<IPet[] | undefined> {
  await dbConnect();
  let _id = new mongoose.Types.ObjectId(id);
  try {
    const user = await User.findOne({_id}).populate<{
      petsSitting: IPet[];
    }>('petsSitting');

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }

    return user.petsSitting;
  } catch (e) {
    console.error(e);
  }
}

export async function getSitters(): Promise<IUser[] | undefined> {
  await dbConnect();

  try {
    const sitters = await User.find({role: 'sitter'});
    if (!sitters) throw new Error('no sitters!');

    return sitters;
  } catch (e) {
    console.error(e);
  }
}
/** Finds 10 nearest sitters. Pass it the loc.coordinates of the current user.*/
export async function getNearestSitters(coords:[number,number]): Promise<IUser[] | undefined> {
  await dbConnect();

  try {
    const sitters = await User.find({
      role: 'sitter',
      "contact.loc":
      {
        $near:
        {
          $geometry: { type: "Point", coordinates: coords },
          $maxDistance: 500000
        }
      }
    }).limit(10);
    if (!sitters) throw new Error('no sitters!');

    return sitters;
  } catch (e) {
    console.error(e);
  }
}

export async function getUserMessages(
  id: string
): Promise<IMessage[] | undefined> {
  await dbConnect();
  let _id = new mongoose.Types.ObjectId(id);
  try {
    const user = await User.findOne({_id}).populate<{
      messages: IMessage[];
    }>('messages');

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }

    return user.messages;
  } catch (e) {
    console.error(e);
  }
}


export async function addUser(user: IUser): Promise<IUser | undefined> {
  await dbConnect();
  if (user.firstname === undefined || user.surname === undefined) {
    throw new Error('firstname and surname are required to create new user');
  }
  try {
    Object.assign(user, {
      messages: [],
      stays: [],
      petsOwned: [],
      petsSitting: [],
    }); //assigns blank arrays to fill later
    const result = await User.create(user);
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function modifyUser(
  clerkID: string,
  newValues: IUser
): Promise<IUser | undefined> {
  await dbConnect();
  try {
    let user = await User.findOneAndUpdate({ clerkID }, newValues, { new: true });
    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID');
    }
    return user;
  } catch (e) {
    console.error(e);
  }
}
