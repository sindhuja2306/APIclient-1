const mongoose = require("mongoose");

// Define MenuItem Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;