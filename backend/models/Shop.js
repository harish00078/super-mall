const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Shop name is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  floor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Floor",
    required: [true, "Floor is required"],
  },
  location: {
    type: String,
    trim: true,
    default: "",
  },
  shopNumber: {
    type: String,
    trim: true,
    default: "",
  },
  contactPhone: {
    type: String,
    trim: true,
    default: "",
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
    default: "",
  },
  openingTime: {
    type: String,
    default: "10:00",
  },
  closingTime: {
    type: String,
    default: "21:00",
  },
  image: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
shopSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Shop", shopSchema);
