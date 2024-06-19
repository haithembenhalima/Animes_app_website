// import the modules
const express = require("express");
const routes = require("./routes/main.router");
const dotenv = require("dotenv");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparser = require("body-parser");
const app = express();

// initialize the middlewares
app.use(express.json());
app.use(express.static("public")); 
app.use('/uploads/images', express.static('uploads'));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_KEY,  resave: true,saveUninitialized: true,}));
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  }),
);
app.use("/",routes);


// launching the server
app.listen(process.env.SERVER_PORT, () => {
    console.log("Server running on port 3000");
})
