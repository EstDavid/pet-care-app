import dbConnect from './dbConnect';
import User, { User as IUser } from './models/User';
import Pet, {Pet as IPet} from './models/Pet';

export async function getAllUsers():Promise<IUser[] | undefined> {
  await dbConnect();

  try {
    const users = await User
      .find({})
      .limit(10);

    return users;

  } catch (e) {
    console.error(e);
  }
}
export async function getUserById(id: string):Promise<IUser | undefined> {
  await dbConnect();

  try {
    const user = await User
      .findOne({ _id: id })
      .populate('petsOwned')
      .populate('petsSitting')
      .populate('messages')
      .populate('stays')

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }

    return user;

  } catch (e) {
    console.error(e);
  }
}


export async function getPetById(id: string):Promise<IPet | undefined> {
  await dbConnect();

  try {
    const pet = await Pet
      .findOne({ _id: id })
      .populate('owner')
      .populate('sitter')

    if (pet === undefined || pet === null) {
      throw new Error('cannot find pet by that ID')
    }

    return pet;

  } catch (e) {
    console.error(e);
  }
}

export async function addUser(firstname: string, surname: string, role: string):Promise<IUser | undefined> {
  await dbConnect();

  try {
    const newUser = { firstname, surname, role };
    const result = await User.create({ newUser });
    return result;

  } catch (e) {
    console.error(e);
  }
}


export async function addPet(name: string, owner: string, species: string):Promise<IPet | undefined> {
  await dbConnect();

  try {
    const newPet = { name, owner, species };
    const result = await Pet.create({ newPet });
    return result;

  } catch (e) {
    console.error(e);
  }
}