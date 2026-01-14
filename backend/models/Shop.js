
const mongoose = require("mongoose");
module.exports = mongoose.model("Shop", new mongoose.Schema({
  name:String, category:String, floor:String, location:String
}));
