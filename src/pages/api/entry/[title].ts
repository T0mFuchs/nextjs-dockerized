import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Entry from "models/entry";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { title } = req.query;
    await mongooseConnect();
    const entry = await Entry.findOne({ title: title, visibility: true });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(entry));
  }
};

export default handler;
