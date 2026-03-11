import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, verifyToken) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const link = `http://localhost:3000/api/auth/verify/${verifyToken}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<h3>Click to verify</h3>
           <a href="${link}">${link}</a>`
  });
};