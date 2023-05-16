const mongoose = require("mongoose");

const can = new mongoose.Schema({

  canteen_name: { type: String, required: true },
  products: [
    {   
        product:{type:String},
        price:{type:String},
        category:{type:Array}
     
    }
  ],
 
});

// const User = mongoose.model("USER", userSchema);
// module.exports = User;

module.exports = mongoose.model("Can", can);