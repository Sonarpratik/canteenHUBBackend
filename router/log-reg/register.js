const express = require("express");
const register = express.Router();
const User = require("../../database/schemaS/userSchema");
const Can = require("../../database/schemaS/canSchema");
const { isAuth ,isLogin} = require("../../all-passport/passportConfig");

const passport = require("passport");
const Contri = require("../../database/schemaS/contriSchema");



register.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        name:req.body.name,
        username: req.body.username,
        password: hashedPassword,
        phone:req.body.phone

      });
      await newUser.save();
      res.send("User Created");
    }
  });
});

register.get("/login",isLogin,(req,res)=>{
  // res.status(404).redirect("/")
  res.status(200).send("donehere")
})
register.post("/login" ,(req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(404).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(201).send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

register.get("/user",isAuth,(req,res)=>{
  // console.log(req.session);
  // console.log(req.body);
  // console.log(req.user);
    res.status(200).send(req.user);
})

register.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { 
      console.log(err);
      return next(err); }
    console.log("LOGOUT")
    res.status(201).send("LOGOUT");

  });
});

register.post('/menu',async (req,res)=>{
  const newCan = new Can({
    canteen_name:req.body.canteen_name,
    products: req.body.products

  });
  await newCan.save();
  res.status(200).send("User Created");
  
})
register.get('/menu/:id',async (req,res)=>{
const pro =await Can.findById(req.params.id)

  res.send([pro])
})
register.get('/product/:id',async (req,res)=>{
const pro =await Can.find()
const data =  pro?.flatMap(obj => obj.products)
// console.log(req.params.id)
  
const uid =  data.filter((item)=>item.product===req.params.id)



  res.send(uid[0])
})
register.get('/menu/',async (req,res)=>{
const pro =await Can.find()

  res.send(pro)
})


register.post('/contribution',async(req,res)=>{


  const Cont = new Contri({
    name:req.body.name,
    desc: req.body.desc,

    img: req.body.img

  });
  await Cont.save();
  res.status(200).send("User Created");
  
})
register.get('/contribution',async(req,res)=>{


  const Cont = await Contri.find();
  res.status(200).send(Cont);
  
})



module.exports = register;
