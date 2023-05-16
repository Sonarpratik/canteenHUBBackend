const express = require("express");
const router = express.Router();
const User = require("../database/schemaS/userSchema");

router.get("/", (req, res) => {
  res.send("//");
});



router.use(require("./log-reg/register"));

module.exports = router;
