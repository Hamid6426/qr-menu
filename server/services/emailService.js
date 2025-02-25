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

export const sendAdminApprovalEmail = async (adminEmail, newAdminEmail, token) => {
  try {
    const approveLink = `${process.env.BASE_URL}/api/admin/verify?token=${token}&accept=true`;
    const rejectLink = `${process.env.BASE_URL}/api/admin/verify?token=${token}&accept=false`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "Admin Approval Request",
      html: `
        <h3>New Admin Registration Request</h3>
        <p>Email: ${newAdminEmail}</p>
        <p>Do you want to approve this admin?</p>
        <a href="${approveLink}" style="padding:10px 20px; background:green; color:white; text-decoration:none;">Approve</a>
        <a href="${rejectLink}" style="padding:10px 20px; background:red; color:white; text-decoration:none; margin-left:10px;">Reject</a>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Admin approval email sent");
  } catch (error) {
    console.error("Error sending admin approval email:", error);
  }
};

export const sendAdminConfirmationEmail = async (adminEmail) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "Admin Account Approved",
      text: "Your admin account has been approved. You can now log in.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Admin confirmation email sent");
  } catch (error) {
    console.error("Error sending admin confirmation email:", error);
  }
};
