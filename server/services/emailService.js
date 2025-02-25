import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 587 or 465 for SSL
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Send Email Verification Code
export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Verification code sent" };
  } catch (error) {
    throw new Error("Error sending verification code: " + error.message);
  }
};

// Send Password Reset Email
export const sendResetPasswordEmail = async (email, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested to reset your password. Use this token: ${resetToken}.\nThis token expires in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "Password reset email sent" };
  } catch (error) {
    throw new Error("Error sending password reset email: " + error.message);
  }
};