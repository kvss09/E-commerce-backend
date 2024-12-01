import nodemailer from "nodemailer";
import { google } from "googleapis";

export const transporterMail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "kvssubbu38@gmail.com",
    pass: "pqxqhtfmnytakxxi",
  },
});

transporterMail.verify((err, success) => {
  if (err) {
    console.log("Error Configuring  transporter:" + err);
  } else {
    console.log("Server is ready to take messages:" + success);
  }
});
