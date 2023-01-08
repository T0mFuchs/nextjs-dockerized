import { NextApiHandler, NextApiResponse } from "next";
import Entry from "models/entry";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  await mongooseConnect();
  if (req.method === "POST") {
    const entries = await Entry.find({ visibility: true }).sort("descending");
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(entries));
  }
};

export default handler;
