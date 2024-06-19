const nodemailer = require('nodemailer');
// Function to send password reset email
const sendPasswordResetEmail = async (req,res, next, email) => {
    try {
      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER, // your SMTP user
          pass: process.env.SMTP_PASS, // your SMTP password
        },
      });
  
      // Email content
      const mailOptions = {
        from: `"Your App Name" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset',
        text: `You requested a password reset. Click the link below to reset your password`,
        html: `<p>You requested a password reset. Click the link below to reset your password:</p>
               ">Reset Password</a>`,
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
      console.log('Password reset email sent to:', email);
      next();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  module.exports = {sendPasswordResetEmail}