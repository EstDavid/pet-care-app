"use server";
import { confirmStay } from "../db/controller/Stay";
import { Stay } from "../db/models/Stay";
import { Types } from "mongoose";

export default async function confirmStayAction(_id:Types.ObjectId){
  await confirmStay(_id);
}