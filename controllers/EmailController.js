import { sendEmail } from "../Utility/helper.function.js";
export const sendEmailController = async (req, res) => {
  const { emails, subject, message } = req.body;
  try {
    for (let i = 0; i < emails.length; i++) {
      await sendEmail(emails[i], subject, message);
    }
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
