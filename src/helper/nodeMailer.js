import nodemailer from "nodemailer";

export const sendMail = (emailTemplate) => {
  const { emailTo, subject, message } = emailTemplate;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "muhozajohn250@gmail.com",
      pass: "bdmwxwiepvhkeuki",
    },
  });
  let mailOptions = {
    from: "muhozajohn250@gmail.com",
    to: emailTo,
    subject,
    // text: "Congratulations you have successfully registered",
    html: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + mailOptions.to, info.response);
    }
  });
};

export default sendMail;
