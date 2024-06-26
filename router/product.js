const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const {
  Authenticate,
  IsAdmin,
  IsAdminAndUser,
  IsAdmin_Product_Create,
  IsAdmin_Product_Update,
  IsAdmin_Product_Delete,
} = require("../middleware/authenticate.js");

router.post("/api/product", IsAdmin_Product_Create, async (req, res) => {
  try {
    const product = new Product(req.body);

    const created = await product.save();
    res.status(201).json(created);
  } catch (err) {
    console.log(err);
    res.status(401).json(err);

  }
});
router.patch("/api/product/:id", IsAdmin_Product_Update, async (req, res) => {
  try {
    const id = req.params.id;
    const { _id, ...data } = req.body;
    console.log(req.body);
    const did = await Product.findByIdAndUpdate({ _id: id }, data, {
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

//Get All Products
router.get("/api/product", async (req, res) => {
  try {
    const { page, limit, product_name,sort,max_price,min_price,min_discount,max_discount, ...resa } = req.query;
    if (product_name) {
      resa.product_name = { $regex: product_name };
    }
    if (min_price && max_price) {
      resa.product_price = { $gte: parseInt(min_price), $lte: parseInt(max_price) };
    }
    if (min_discount && max_discount) {
      resa.product_discount = { $gte: parseInt(min_discount), $lte: parseInt(max_discount) };
    }


    console.log(resa);
 
    resa.active=true
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Product.countDocuments(resa);
    // const sortedProductSizes = resa.product_size.slice().sort();
    // console.log(sortedProductSizes)
    // Fetch data with pagination using skip() and limit()
    let query = Product.find(resa);

    if (sort) {
      query = query.sort({ product_price: sort });
    }

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
  }
});





router.get("/api/product/admin",IsAdmin, async (req, res) => {
  try {
    const { page, limit, product_name, product_size, ...resa } = req.query;
    if (product_name) {
      resa.product_name = { $regex: product_name };
    }

    if (product_size) {
      try {
        const product_sizeString = product_size.join(",");
        if (product_size) {
          const sizes = product_sizeString.split(",");
          resa.product_size = { $in: sizes };
        }
      } catch (e) {
        resa.product_size = product_size;
      }
    }
    console.log(resa);
    // Convert the product_size query parameter into an array
    // const page = req.query.page;
    // const limit = req.query.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalCount = await Product.countDocuments(resa);
    // const sortedProductSizes = resa.product_size.slice().sort();
    // console.log(sortedProductSizes)
    // Fetch data with pagination using skip() and limit()
    const data = await Product.find(resa).skip(startIndex).limit(limit);
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
  }
});


router.get("/api/product/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById({ _id: id });


    
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ data: "product not found" });

    console.log(err);
  }
});

//delete product
router.delete("/api/product/:id", IsAdmin_Product_Delete, async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByIdAndDelete({ _id: id });

    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ data: "product not found" });

    console.log(err);
  }
});

module.exports = router;
