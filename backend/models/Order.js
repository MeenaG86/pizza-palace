const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: String,
  phone: String,
  address: String,
  city: String,
  pincode: String,

  items: Array,

  subtotal: Number,
  delivery: Number,
  totalPrice: Number,

  paymentMethod: String,

  status: {
    type: String,
    default: "Preparing",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Order", orderSchema);