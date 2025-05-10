const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  dateOfSale: { type: Date, default: Date.now },
  quantitySold: { type: Number, required: true, min: 1 },
  region: { type: String, required: true },
  discount: { type: Number, required: true, min: 0, max: 100 },
  shippingCost: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true },
  other: {
    deliveryStatus: { type: String },
    deliveredDate: { type: Date },
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
