const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../database/schemaS/userSchema");

exports.initializingPassport =  async (passport) => {
   passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
       const user = await User.findOne({ username })
        //   if (err) {
        //     return done(err);
        //   }
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
       
      } catch (error) {
        console.log(error);
        return done(null, error);
      }
    })
  );
  //user pasun user id banavto
  passport.serializeUser((user,done)=>{
    done(null,user.id);
  });
  //id pasun user sapadto
  passport.deserializeUser(async(id,done)=>{

    try {
        const user= await User.findById({_id:id});
        const userInformation = {
          username: user.username,
        };
        done(null,userInformation);
        
    } catch (error) {
        return done(error, false);
        
    }
  })
};

exports.isAuth= async (req,res,next)=>{
if(req.user) {
 console.log(req.user)
  return next();
}
res.status(404).send("NOUSER");
}

exports.isLogin=async(req,res,next)=>{
  if(req.user){
    return res.status(404).send("isLogin")
  }else{
    return next();
  }
}