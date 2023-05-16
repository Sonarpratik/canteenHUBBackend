const User = require("./database/schemaS/userSchema");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports =  (passport)=> {
  passport.use(
    new localStrategy( async(username, password, done) => {
try {
    const user = await User.findOne({ username: username })
         
    // if (err) throw err;
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

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser( async (id, cb) => {
    try {
        const user = await User.findOne({_id:id})
        const userInformation = {
            username: user.username,
          };
        cb(null, userInformation);

    } catch (error) {
        cb(error, false);
    }

    // User.findOne({ _id: id }, (err, user) => {
    //   const userInformation = {
        // username: user.username,
    //   };
    //   cb(err, userInformation);
    // });
  });
};


