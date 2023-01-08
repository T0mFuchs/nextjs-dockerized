import { ObjectId } from "mongodb";

export type UserType = {
  _id?: string | ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified?: true | null;
};
