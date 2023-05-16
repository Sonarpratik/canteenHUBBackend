const express = require("express");
const imFile = express.Router();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require ("cookie-parser");
const method =require("method-override")
const { initializingPassport,isAuth ,isLogin} = require("../all-passport/passportConfig");
const bodyparser = require ("body-parser")


const dotenv = require("dotenv");
dotenv.config();

//should be before auth
imFile.use(express.json());
imFile.use(bodyparser.json())

imFile.use(express.urlencoded({extended:true}));

const cors = require("cors")
imFile.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));


imFile.use(
  session({ secret: "secretcode", resave: false, saveUninitialized: false })
  );
  imFile.use(cookieParser("secretcode"));
  imFile.use(passport.initialize());
  imFile.use(passport.session());
  imFile.use(method("_method"))
  
  initializingPassport(passport);

module.exports = imFile;
