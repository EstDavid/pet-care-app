import dbConnect from '../dbConnect';
import User, { User as IUser } from '../models/User';
import Pet, { Pet as IPet } from '../models/Pet';
import Stay, { FullStay, Stay as IStay } from '../models/Stay';
import { ObjectId, Types } from 'mongoose';

export async function addStay (
  owner: string,
  sitter: string,
  petArray: string[],
  from: Date,
  to: Date
): Promise<IStay | undefined> {
  await dbConnect();

  try {
    const newStay = {
      from,
      to,
      owner,
      sitter,
      pet: petArray,
      confirmed: false,
    };
    const result = Stay.create(newStay);
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function confirmStay (
  _id: Types.ObjectId
): Promise<IStay | undefined> {
  await dbConnect();
  try {
    const result = await Stay.findOneAndUpdate({ _id }, { confirmed: true });
    if (result) return result;
    else throw new Error('error, stay confirm failed');
  } catch (e) {
    console.log(e);
  }
}

// Added by Alaa Starts here
export async function getStaysForPet (
  petId: string
): Promise<IStay[] | undefined> {
  await dbConnect();

  try {
    const stays = await Stay.find({ pet: petId });
    return stays || []; // Return an empty array if there are no stays
  } catch (e) {
    console.error(e);
    return []; // Return an empty array in case of any error
  }
}

// If no date is passed, it return all the stays. Otherwise it only return future or ongoing stays
export async function getStaysByUser (userId: Types.ObjectId, currentDate?: Date): Promise<FullStay[]> {
  await dbConnect();

  try {
    const staysQuery = Stay.find({
      $or: [
        { owner: userId },
        { sitter: userId }
      ],
    });

    if (currentDate) {
      staysQuery.find({ to: { $gte: currentDate } });
    }

    staysQuery
      .populate({ path: 'owner', model: User })
      .populate({ path: 'sitter', model: User })
      .populate({ path: 'pet', model: Pet });

    const stays: FullStay[] = await staysQuery.exec() as unknown as FullStay[];

    return stays || []; // Return an empty array if there are no stays
  } catch (e) {
    console.error(e);
    return []; // Return an empty array in case of any error
  }
}


/**pass it a clerk ID, get a list of stays */
export async function getStaysByClerkUser (clerkId: string) {
  await dbConnect();

  try {
    const user = await User.findOne({ clerkID: clerkId });

    const stays = await Stay.find({ sitter: user._id })
      .populate<{ pet: IPet[]; }>({ path: 'pet', model: Pet })
      .populate<{ owner: IUser; }>({ path: 'owner', model: User });

    return stays || []; // Return an empty array if there are no stays
  } catch (e) {
    console.error(e);
    return []; // Return an empty array in case of any error
  }
}

// Confirm Stay is Eneded
export async function confirmStayIsEnded (stayId: string): Promise<boolean> {
  await dbConnect();

  try {
    const stay = await Stay.findOne({ _id: stayId });
    if (!stay) return false;
    const today = new Date();
    return today > stay.to;
  } catch (e) {
    console.error(e);
    return false;
  }
}

// Check if isPetInStay by checking is stay is there and if stay not ended
export async function isPetInStay (petId: string): Promise<boolean> {
  await dbConnect();

  try {
    const stays = (await getStaysForPet(petId)) ?? []; // Add nullish coalescing operator to handle undefined stays
    for (let stay of stays) {
      if (!(await confirmStayIsEnded(stay._id.toString()))) return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
}
// Added by Alaa Ends here
