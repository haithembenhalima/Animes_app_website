
const store = require("store");
const jwt = require("jsonwebtoken");
const Models = require("../models/index.model");
const dotenv = require("dotenv");

const verifyToken = async (req,res,next) => {

    // get token from the cookie session saved
    const token = req.cookies.token;

    console.log("token is: ", token); 

    try { 
        const matchedToken = await jwt.verify(token,process.env.JWT_KEY);   
        if(matchedToken)
        {
            next();
        }  
    } catch (error) {
        console.log(error);
        res.redirect("/login")
        console.log("Token expired");
    }
};

module.exports = {verifyToken};