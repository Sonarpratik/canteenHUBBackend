const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  created_by:{type:String},
  owner_name: { type: String, required: true },
  hostel_name: { type: String, required: true },
  hostel_description: { type: String, required: true },
  hostel_phone: { type: Number, required: true },
  hostel_rating: { type: Number},
  hostel_email: { type: String, required: true },
  hostel_address: { type: String, required: true },
  hostel_state: { type: String, required: true },
  hostel_city: { type: String, required: true },
  hostel_zip_code: { type: String, required: true },
  hostel_coordinates:{
    lat: { type: Number},
    long: { type: Number},
  },
  hostel_features: {
    single_bed: { type: Boolean, default: false },
    double_bed: { type: Boolean, default: false },
    attach_washroom: { type: Boolean, default: false },
    study_table: { type: Boolean, default: false },
    hot_water: { type: Boolean, default: false },
    drinking_water: { type: Boolean, default: false },
  },
  hostel_other_feature: { type: String },
  allowed_for: { type: String },//BOYS GIRLS OTHERS
  hostel_monthly_price:{ type: String},
  hostel_img:{type:String},
  multi_img:[{type:String}],

  distance_from_college:{ type: Number,default:"200"}
});

const Hostel = mongoose.model("HOSTEL", hostelSchema);
module.exports = Hostel;
