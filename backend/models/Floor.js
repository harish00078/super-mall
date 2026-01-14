const mongoose = require("mongoose");

const floorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Floor name is required"],
    unique: true,
    trim: true,
  },
  number: {
    type: Number,
    required: [true, "Floor number is required"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  mapImage: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Floor", floorSchema);
