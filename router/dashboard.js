const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema.js");
const Hostel = require("../models/hostelSchema.js");
const Admin = require("../models/adminSchema.js");
const {
  Authenticate,
  IsAdmin,
  IsAdminAndUser,
  IsAdmin_Product_Create,
  IsAdmin_Product_Update,
  IsAdmin_Product_Delete,
} = require("../middleware/authenticate.js");


// Calculate the weighted sum for each h,ostel

router.get("/api/dashboard", async (req, res) => {
  try {
    const user = await User.countDocuments();
    const hostel= await Hostel.countDocuments();
    const admin= await Admin.countDocuments();
    const structure = [
        {
            _id: 1,
            name: "User",
            count: user,
            img:"/assets/icons/glass/ic_glass_users.png",
            color:"info"

        },
        {
            _id: 2,
            name: "Hostel",
            count: hostel,
            img:"/assets/icons/glass/ic_glass_bag.png",
            color:"success"


        },
        {
            _id: 3,
            name: "Admin",
            count: admin,
            img:"/assets/icons/glass/ic_glass_users.png",
            color:"success"


        }
    ];
    res.status(200).send(structure)


  } catch (err) {
    res.status(404).json({ data: "hostel not found" });

    console.log(err);
  }
});

router.get("/api/dashboard/hostel", async (req, res) => {
  try {
    const hostels= await Hostel.find();
    const featureCounts = hostels.reduce((acc, hostel) => {
        for (const [feature, value] of Object.entries(hostel.hostel_features)) {
            if (value) {
                acc[feature] = (acc[feature] || 0) + 1;
            }
        }
        return acc;
    }, {});
    
    const result = Object.entries(featureCounts).map(([label, value]) => ({
        label,
        value
    }));
    res.status(200).send(result)


  } catch (err) {
    res.status(404).json({ data: "hostel not found" });

    console.log(err);
  }
});

module.exports = router;
