import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import {Pet as IPet} from '../models/Pet';
import {Message as IMessage} from '../models/Message'

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

export async function getPetsOwnedByUser(id: string):Promise<IPet[] | undefined> {
  await dbConnect();

  try {
    const user = await User
      .findOne({ _id: id })
      .populate<{petsOwned: IPet[]}>('petsOwned')

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }

    return user.petsOwned;

  } catch (e) {
    console.error(e);
  }
}


export async function getPetsSatByUser(id: string):Promise<IPet[] | undefined> {
  await dbConnect();

  try {
    const user = await User
      .findOne({ _id: id })
      .populate<{petsSitting: IPet[]}>('petsOwned')

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }

    return user.petsSitting;

  } catch (e) {
    console.error(e);
  }
}

export async function getUserMessages(id:string):Promise<IMessage[] | undefined> {
  await dbConnect();

  try {
    const user = await User
      .findOne({ _id: id })
      .populate<{messages: IMessage[]}>('messages')

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }

    return user.messages;

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

export async function modifyUser(id: string, newValues:IUser):Promise<IUser | undefined> {

  await dbConnect();

  try {
    let user = await User.findOne({_id:id})

    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }

    user = {... user, ...newValues}


    return user;

  } catch (e) {
    console.error(e);
  }

}