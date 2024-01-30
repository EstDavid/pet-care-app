import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import Pet, {Pet as IPet} from '../models/Pet';
import {Message as IMessage} from '../models/Message'
import mongoose, { Types } from 'mongoose';

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


export async function addUser(user:IUser):Promise<IUser | undefined> {
  await dbConnect();
  if (user.firstname === undefined || user.surname === undefined){
    throw new Error('firstname and surname are required to create new user')
  }
  try {
    Object.assign(user, {messages:[], stays:[], petsOwned:[], petsSitting:[]}) //assigns blank arrays to fill later
    const result = await User.create(user);
    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function modifyUser(id: string, newValues:IUser):Promise<IUser | undefined> {
  await dbConnect();
  try {
    let user = await User.findOneAndUpdate({_id:id}, newValues);
    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }
    return user;
  } catch (e) {
    console.error(e);
  }
}

export async function _addOwnedPetToUser(ownerId: string, petId:string):Promise<IUser | undefined> {
  await dbConnect();
  try {
    let user = await User.findOne({_id:ownerId});
    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }
    let pet = await Pet.findOne({_id:petId});
    if (pet === undefined || pet === null) {
      throw new Error('cannot find pet by that ID')
    }
    const idToAdd = pet._id
    if (user.petsOwned) {
    user.petsOwned.push(idToAdd);
    user.save();
  }
    return user;
  } catch (e) {
    console.error(e);
  }
}

export async function addSatPetToUser(id: string, petId:string):Promise<IUser | undefined> {
  await dbConnect();
  try {
    let user = await User.findOne({_id:id});
    if (user === undefined || user === null) {
      throw new Error('cannot find user by that ID')
    }
    let pet = await Pet.findOne({_id:petId});
    if (pet === undefined || pet === null) {
      throw new Error('cannot find pet by that ID')
    }
    const idToAdd = pet._id
    user.petsSitting.push(idToAdd);
    user.save();
    return user;
  } catch (e) {
    console.error(e);
  }
}
