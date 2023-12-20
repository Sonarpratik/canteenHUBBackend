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
      acc[key] =
        typeof req.body[key] === "string"
          ? req.body[key].toLowerCase()
          : req.body[key];
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
    const {
      distance_from_college,
      page,
      limit,
      hostel_name,
      max_price,
      single_bed,
      min_price,
      double_bed,
      attach_washroom,
      study_table,
      hot_water,
      drinking_water,
      three_bed,
      four_bed,
      ...resa
    } = req.query;
    if (hostel_name) {
      resa.hostel_name = { $regex: hostel_name };
    }
    if (distance_from_college) {
      resa.distance_from_college = {
        $lte: parseInt(distance_from_college),
      };
    }
    const orConditions = [];

    if (single_bed) {
      orConditions.push({ "hostel_features.single_bed": single_bed });
    }
    if (three_bed) {
      orConditions.push({ "hostel_features.three_bed": three_bed });
    }
    if (four_bed) {
      orConditions.push({ "hostel_features.four_bed": four_bed });
    }
    if (double_bed) {
      orConditions.push({ "hostel_features.double_bed": double_bed });
    }
    if (attach_washroom) {
      orConditions.push({ "hostel_features.attach_washroom": attach_washroom });
    }
    if (study_table) {
      orConditions.push({ "hostel_features.study_table": study_table });
    }
    if (hot_water) {
      orConditions.push({ "hostel_features.hot_water": hot_water });
    }
    if (drinking_water) {
      orConditions.push({ "hostel_features.drinking_water": drinking_water });
    }

    const resa1 = { ...resa }; // Create a new object based on resa

    if (orConditions.length > 0) {
      resa1.$or = orConditions; // Include $or if orConditions is not empty
    }
    console.log(resa1);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Hostel.countDocuments(resa1);
    let query = Hostel.find(resa1);

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
router.delete("/api/hostel/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const hostel = await Hostel.findByIdAndDelete({ _id: id });
 

    res.status(200).json(hostel);
  } catch (err) {
    res.status(404).json({ data: "hostel not found" });

    console.log(err);
  }
});
router.get("/api/MYhostel/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const hostel = await Hostel.findOne({ created_by: id });
    if(!hostel){
      const hostel2=await Hostel.findById({_id:id})
    res.status(200).json(hostel2);

    }else{
      res.status(200).json(hostel);

    }

  } catch (err) {
    res.status(404).json({ data: "hostel not found" });

    console.log(err);
  }
});
router.patch("/api/hostel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, ...data } = req.body;
    console.log(req.body);
    const did = await Hostel.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
    res.status(200).send(did);

    // await product.save();
    // res.status(201).json(req.body);
  } catch (err) {
    res.status(404).json(req.body);

    console.log(err);
  }
});
module.exports = router;
