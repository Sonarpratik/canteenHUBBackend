const express = require("express")
const app = express();
const PORT = 4000;


app.use(require("./router/imFile"))
app.use(require("./router/auth"));

//Connection is achieved
require('./database/connection')

//to understand json file
app.get("*",(req,res)=>{
res.status(404).send("heres")
})
app.listen(PORT,()=>{
    console.log(`listning on ${PORT}`)
})