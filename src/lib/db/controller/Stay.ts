import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import Pet, { Pet as IPet } from '../models/Pet';
import Stay, { Stay as IStay } from '../models/Stay'

export async function addStay(owner: IUser, sitter: IUser,
  petArray: IPet[], dates: Date[]): Promise<IStay | undefined> {
  await dbConnect();

  try {
    let from = dates[0];
    let to = dates[1];
    const petIds = petArray.map(pet => pet._id)

    if (!owner._id || !sitter._id) throw new Error('owner or sitter missing an _id')

    const newStay: IStay = {
      from,
      to,
      owner: owner._id,
      sitter: sitter._id,
      pet: petIds,
      confirmed: false
    }
    const result = Stay.create(newStay);
    return result;

  } catch (e) {
    console.log(e);

  }
}

export async function confirmStay(stay: IStay): Promise<IStay | undefined> {
  await dbConnect();
  try {
    const result = await Stay.findOneAndUpdate({_id:stay._id}, {confirmed:true})
    if(result) return result;
    else throw new Error('error, stay confirm failed');
  } catch (e) {
    console.log(e);
  }
}