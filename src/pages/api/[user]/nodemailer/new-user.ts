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
          subject: `Hello, ${name} 👋 this is your verification email`,
          html: `
              <div style="padding: 2em; box-shadow: #30234d15 0 1em 2.3em -1em, #00000080 0 1.5em 2em -1.5em; display: grid; grid-template: 1fr; justify-content: center; margin: auto; width: 350px; max-width: 500px; height: 200px; max-height: 500px; border-radius: 10px;">
                <h2 style="margin: auto">Welcome, ${name} 👋</h2>
                <h4 style="border-radius: 6px; background-color: #efefef; margin: auto; padding: 7px;">
                  verify your email with this link
                  <a href="${process.env.NEXTAUTH_URL}/${user}/verify-email">here</a>
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
