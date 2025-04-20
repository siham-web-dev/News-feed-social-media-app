import nodemailer from "nodemailer";
import { SMTP_CONFIG, SMTP_FROM } from "./constants";

export const sendMail = async (to: string, subject: string, text: string) => {
  const transport = nodemailer.createTransport(SMTP_CONFIG);

  const mailOptions = {
    from: SMTP_FROM,
    to,
    subject,
    text,
  };

  try {
    await transport.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
