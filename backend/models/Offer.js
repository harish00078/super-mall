const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Offer title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "",
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    default: "percentage",
  },
  discountValue: {
    type: Number,
    required: [true, "Discount value is required"],
    min: 0,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: [true, "Shop is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    default: "",
  },
  termsAndConditions: {
    type: String,
    default: "",
  },
  minPurchaseAmount: {
    type: Number,
    default: 0,
  },
  maxDiscountAmount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Virtual to check if offer is currently valid
offerSchema.virtual("isValid").get(function () {
  const now = new Date();
  return this.isActive && now >= this.startDate && now <= this.endDate;
});

offerSchema.set("toJSON", { virtuals: true });
offerSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Offer", offerSchema);
