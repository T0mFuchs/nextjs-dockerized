import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import mongooseConnect from "lib/mongoose-connect";
import Entry from "models/entry";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "DELETE") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const { _id, author } = req.body;
      if (!_id || !author) {
        return res.status(400).end();
      }
      await mongooseConnect();
      await Entry.findOneAndDelete({ _id: _id, author: author });
      res.statusCode = 200;
      res.end();
    } else res.status(400).end("no session");
  }
};

export default handler;
