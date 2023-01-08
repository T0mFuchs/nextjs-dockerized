import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import User from "models/user";
import mongooseConnect from "lib/mongoose-connect";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const user: string = req.query.user as string; //* ._id of user
      if (!user) {
        return res.status(400).json({ message: "Bad request" });
      }
      await mongooseConnect();
      await User.findOneAndUpdate({ _id: user }, { emailVerified: true });
      res.statusCode = 200;
      res.end();
    } else res.status(400).end("no session");
  }
};

export default handler;
