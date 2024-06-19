const Models = require("../models/index.model");
const {body, query, validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const store = require("store");

const login = async (req,res) =>{
    const user = req.body;

    try {
        const checkUser = await Models.User.findOne({where: {email: user.email}});
        const matchedPassword = await bcrypt.compare(user.password, checkUser.password);
        console.log("Matched password result: ", matchedPassword);
        if(checkUser && matchedPassword ) {
            const token = await jwt.sign({email: user.email},process.env.JWT_KEY,{expiresIn:"1h"});
            // Decode the token without verification to inspect the payload
            const decodedToken = jwt.decode(token);  
            console.log("Decoded Token Payload:", decodedToken);
            console.log("Token Expires At:", new Date(decodedToken.exp * 1000).toLocaleString());

            await Models.User.update({token: token},{where: {email: user.email}});
            // create session with id and token
            req.session.id = checkUser.id;
            req.session.name = checkUser.firstname;
            req.session.token = token;
            // create coockie ession with the token
            res.cookie("token",token)
            // redirect page
            res.redirect("/animes");
            
        }else{
            res.render("login",{error: "Email or password not valid"});
            
        }
    } catch (error) {
        console.log(error);
    }
};

const signup =  async (req,res) =>{
    // check if there is a validation error
    const result = validationResult(req);
    // send the validation results to the veiw pages
    if (!result.isEmpty()) {

        if(result.errors[0].path === "password")
        {
            res.render("signup",{error: "Password must be between 8 and 30 caracters",user:""});
        }
        if(result.errors[0].path === "email")
        {
            res.render("signup",{error: "Email invalid syntaxe",user:""});
        }
    }

    // adding user to db
    const newUser = req.body;
    
    // bcrypt the password 
    const hashedPassword = await bcrypt.hash(newUser.password,8);

    newUser.password = hashedPassword;

    console.log(newUser);
    
    try {
        const addNewUser = await Models.User.create(newUser);
        res.render("signup",{error:"",user: "user added successfely"});
    } catch (error) {
        console.log(error);
    }
    
};


module.exports = {
    signup,
    login
}