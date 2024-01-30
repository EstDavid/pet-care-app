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