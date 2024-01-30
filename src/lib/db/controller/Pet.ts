import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import Pet, {Pet as IPet} from '../models/Pet';
import { _addOwnedPetToUser } from './User';

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

export async function addPet(newPet:IPet):Promise<IPet | undefined> {
  await dbConnect();
  try {
    if(!newPet.owner) {
      throw new Error('must include an owner ID')
    }

    const owner = await User.findOne({_id:newPet.owner})
    if (owner === undefined || owner === null) {
      throw new Error('cannot find owner for that pet')
    }

    const result = await Pet.create(newPet);
    await _addOwnedPetToUser(owner.id, result.id)

    return result;
  } catch (e) {
    console.error(e);
  }
}

export async function setPetSitter(pet:IPet, sitter:IUser):Promise<IPet | undefined> {
  await dbConnect();
  try {
    const petToUpdate = await Pet.findOne({_id:pet._id});
    if (!petToUpdate) throw new Error('pet not found')

    const sitterToUpdate = await User.findOne({_id:sitter._id})
    if (!sitterToUpdate) throw new Error('sitter not found')

    if (petToUpdate.sitter) throw new Error('pet already has a sitter')

    petToUpdate.sitter = sitterToUpdate._id // add sitter to pet
    sitterToUpdate.petsSitting.push(petToUpdate._id) // add pet to sitter's list of pets
    petToUpdate.save();
    sitterToUpdate.save();

    return petToUpdate;
  } catch (e) {
    console.error(e);
  }
}

export async function removePetSitter(pet:IPet, sitter:IUser):Promise<IPet | undefined> {
  await dbConnect();
  try {
    const petToUpdate = await Pet.findOne({_id:pet._id});
    if (!petToUpdate) throw new Error('pet not found')

    const sitterToUpdate = await User.findOne({_id:sitter._id})
    if (!sitterToUpdate) throw new Error('sitter not found')

    delete petToUpdate.sitter; // remove sitter from pet
    const petIndex = sitterToUpdate.petsSitting.findIndex((el => el._id == petToUpdate._id)) //TODO test if this works
    sitterToUpdate.petsSitting.splice(petIndex,1); // remove pet from sitter array

    petToUpdate.save();
    sitterToUpdate.save();

    return petToUpdate;
  } catch (e) {
    console.error(e);
  }
}

