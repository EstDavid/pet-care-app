import dbConnect from "../dbConnect";
import Stay from "../models/Stay";
import { Types } from "mongoose";

export async function isPetOnStay(petId: string): Promise<boolean> {
  await dbConnect();

  try {
    const currentDate = new Date();

    // Find stays where the pet is involved, the stay is confirmed, and the current date is between the from and to dates
    const activeStay = await Stay.findOne({
      pet: Types.ObjectId(petId),
      confirmed: true,
      from: { $lte: currentDate },
      to: { $gte: currentDate },
    });

    // If an active stay is found, the pet is currently on a stay
    return !!activeStay;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to check pet stay status.");
  }
}
