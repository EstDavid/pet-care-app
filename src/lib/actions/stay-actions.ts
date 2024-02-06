"use server";
import { confirmStay } from "../db/controller/Stay";
import { Stay } from "../db/models/Stay";

export default async function confirmStayAction(stay:Stay){
  await confirmStay(stay);
}