import { NextApiHandler, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import mongooseConnect from "lib/mongoose-connect";
import Entry from "models/entry";

const handler: NextApiHandler = async (req, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const user: string = req.query.user as string; //* ._id of user
      const title = req.query.title;
      await mongooseConnect();
      const entry = await Entry.findOne({
        title: title,
        author: user,
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(entry));
    } else res.status(400).end("no session");
  }
};

export default handler;
