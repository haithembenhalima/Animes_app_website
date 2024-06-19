const nodemailer = require('nodemailer');


const home_page = (req,res) => {
    res.render("index");
};

const login_page = (req,res) => {
    res.render("login",{error:""});
};

const signup_page = (req,res) => {
    res.render("signup",{error: "", user:""});
};

const animes_page = (req,res) => {
    res.render("animes");
};

const anime_add_page = (req,res) => {
    res.render("anime_add");
};

const resetPassword = async (req,res) => {
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
          to: "haithembenhalima12@gmail.com",
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



module.exports = {
    home_page,
    login_page,
    signup_page,
    animes_page,
    anime_add_page,
    resetPassword
}