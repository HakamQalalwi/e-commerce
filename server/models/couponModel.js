const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Cupon name required"],
      unique: true,
    },
    expire: {
      type: Date,
      required: [true, "Cupon expire time required"],
    },
    discount: {
      type: Number,
      required: [true, "Cupon discount value required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
