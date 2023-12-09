const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema.js");
const Hostel = require("../models/hostelSchema.js");
const {
  Authenticate,
  IsAdmin,
  IsAdminAndUser,
  IsAdmin_Product_Create,
  IsAdmin_Product_Update,
  IsAdmin_Product_Delete,
} = require("../middleware/authenticate.js");

router.post("/api/hostel", async (req, res) => {
  try {
    const lowerCaseData = Object.keys(req.body).reduce((acc, key) => {
      acc[key] = typeof req.body[key] === 'string' ? req.body[key].toLowerCase() : req.body[key];
      return acc;
    }, {});

    const hostel = new Hostel(lowerCaseData);

    const created = await hostel.save();
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);

  }
});
router.get("/api/hostel", async (req, res) => {
  try {
    const { page, limit, hostel_name,max_price,single_bed,min_price, ...resa } = req.query;
    if (hostel_name) {
      resa.hostel_name =hostel_name.toLowerCase();
    }
    if (single_bed) {
      resa['hostel_features.single_bed'] = single_bed;
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Hostel.countDocuments(resa);
    // const sortedProductSizes = resa.product_size.slice().sort();
    // console.log(sortedProductSizes)
    // Fetch data with pagination using skip() and limit()
    let query =  Hostel.find(resa);



    const data = await query.skip(startIndex).limit(limit);
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalCount / limit);
    // const product = await Product.find();

    const response = {
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalCount,
      data: data,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);

  }
});
router.get("/api/hostel/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const hostel = await Hostel.findById({ _id: id });


    
    res.status(200).json(hostel);
  } catch (err) {
    res.status(404).json({ data: "hostel not found" });

    console.log(err);
  }
});

module.exports = router;
