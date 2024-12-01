import nodemailer from "nodemailer";
import { transporterMail } from "../config/nodemailer.js";

export const sendEmail = async (emails, subject, message) => {
  const mailOptions = {
    from: "kvssubbu38@gmail.com",
    to: emails,
    subject: subject,
    text: message,
  };
  try {
    const result = await transporterMail.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error while sending email", err);
      }
      console.log("Email sent", info.response);
    });
    console.log("Email sent successfully");
  } catch (err) {
    console.log("Email sending falied due to error" + err);
  }
};
