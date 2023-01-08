import { ObjectId } from "mongodb";

export type EntryType = {
  [x: string]: any;
  _id?: string | ObjectId;
  title?: string;
  body?: string;
  visibility?: boolean;
  author?: string | ObjectId;
  updatedAt?: string | ObjectId;
};
