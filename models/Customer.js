const mongoose = require("mongoose");

const custSchema = new mongoose.Schema({
  customerId: { type: String, required: true, unique: true },
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  address: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Customer", custSchema);
