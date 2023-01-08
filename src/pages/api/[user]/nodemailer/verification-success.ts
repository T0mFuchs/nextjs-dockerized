import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import nodemailer from "nodemailer";

// todo :: this email sends twice for some reason

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session) {
      const user: string = req.query.user as string; //* ._id of user
      const { email, name } = req.body;
      if (!user || !email || !name) {
        return res.status(400).json({ message: "Bad request" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: email,
          subject: `your email has been verified`,
          html: `
              <div style="padding: 2em; box-shadow: #30234d15 0 1em 2.3em -1em, #00000080 0 1.5em 2em -1.5em; display: grid; grid-template: 1fr; justify-content: center; margin: auto; width: 350px; max-width: 500px; height: 200px; max-height: 500px; border-radius: 10px;">
                <h4 style="border-radius: 6px; background-color: #efefef; margin: auto; padding: 7px;">
                  successfully verified your email 👏
                </h4>
                <h4 style="border-radius: 6px; background-color: #efefef; margin: auto; padding: 7px;">
                  you can now create, update & delete entries 🎉
                </h4>
                <h4 style="border-radius: 6px; background-color: #efefef; margin: auto; padding: 7px;">
                  <a href="${process.env.NEXTAUTH_URL}">continue</a>
                </h4>              
              </div>
            `,
        });
        res.statusCode = 200;
        res.end();
      } catch (e) {
        console.error(e);
      }
    } else res.status(400).end("no session");
  }
};

export default handler;
