const Models = require("../models/index.model");

const checkExistingEmail = async (req,res,next) => {
    const email = req.body.email;

    try {
        const user = await Models.User.findOne({ where: { email: email } });
        if(user){
            res.render("signup",{error: "Email already in use",user:""})
        }else{
            next();
        }
    } catch (error) {
        
    }
};

module.exports = {checkExistingEmail}
