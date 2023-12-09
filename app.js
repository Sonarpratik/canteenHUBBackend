const express = require("express");
const app = express();
const mongoose = require("mongoose");

const paymentRoute =require ("./routes/paymentRouter.js");



const port = process.env.PORT || 4000;
const dotenv = require("dotenv");
dotenv.config();

// const PORT = process.env.PORT;

const cors = require("cors")
app.use(cors());








app.get('/about', function (req, res){
        res.render('dataFrom.html');
});

require('./allFiles/Allfun')

//Connection is achieved
require('./db/conn')

//to understand json file
app.use(express.json());


app.use("/api", paymentRoute);

app.get("/api/getkey",async (req, res) =>{

  try {
    
    await res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
  } catch (error) {
    console.log(error)
  }
}
);
//We connect to the router to free the space in app js
// var requestRoute=require('./router/auth')
app.use(require('./router/auth'))
// app.use(require('./router/auth'))
app.use(require('./router/product'))
app.use(require('./router/hostel'))
// require('./router/auth')



app.get("/contact", (req, res) => {
  res.send("hello contact");
});
app.get("*", (req, res) => {
  res.status(404).send("hello hahaha ur wrong");
});

app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});









