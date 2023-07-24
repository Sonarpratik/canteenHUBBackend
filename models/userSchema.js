const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },

  role:{type:String,default:"client"},
  invoice_create:{type:Boolean,default:true},
  invoice_edit:{type:Boolean,default:true},
  invoice_delete:{type:Boolean,default:true},
  invoice_view:{type:Boolean,default:true},
  client_create:{type:Boolean,default:true},
  client_edit:{type:Boolean,default:true},
  client_delete:{type:Boolean,default:true},
  client_view:{type:Boolean,default:true},
  tokens: [
    {
      token: {
        type: String,
        required:true
      },
    },
  ],
});

//we are hashing the password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("hi i am insdie")

    this.password = await bcrypt.hash(this.password, 12);
    // this.cpassword = await bcrypt.hash(this.cpassword, 12);

  }
  next();
});

//We are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    
    await this.save();
    return token;

  } catch (err) {
    console.log(err+"Error in generating token");
  }
};

// module.exports = mongoose.model("Main", userSchema);

const User = mongoose.model("USER", userSchema);
module.exports = User;
