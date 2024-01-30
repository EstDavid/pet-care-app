import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import Pet, {Pet as IPet} from '../models/Pet';

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