const express = require("express");

const router = express.Router();

const Order = require("../models/Order");


// PLACE ORDER
router.post("/place", async (req, res) => {

  try {
        console.log("REQ BODY:", req.body);

    const {
      name,
      items,
      subtotal,
      delivery,
      totalPrice,
      address,
      city,
      pincode,
      phone,
      paymentMethod,
    } = req.body;

    // VALIDATION
    if (
      !name?.trim() ||
      !items ||
      items.length === 0 ||
      !address?.trim() ||
      !city?.trim() ||
      !pincode?.trim() ||
      !phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All order details are required",
      });
    }

    // PRICE VALIDATION
    if (
      isNaN(Number(totalPrice)) ||
      Number(totalPrice) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order amount",
      });
    }

    const order = new Order({
        customerId: req.user.id, // logged-in user id

      name,
      phone,
      address,
      city,
      pincode,

      items,

      subtotal: Number(subtotal),
      delivery: Number(delivery),
      totalPrice: Number(totalPrice),

      paymentMethod,
      status: "Pending",
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Order failed",
      error: error.message,
    });

  }
});


// USER / ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ADMIN GET ALL ORDERS
router.get("/admin/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ADMIN UPDATE ORDER STATUS
router.put("/admin/update/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ADMIN DASHBOARD STATS
router.get("/admin/stats", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    const totalOrders = orders.length;

    const totalRevenue = orders.reduce(
      (total, order) =>
        total + Number(order.totalPrice || 0),
      0
    );

    let totalPizzas = 0;

    orders.forEach((order) => {
      order.items?.forEach((item) => {
        totalPizzas += Number(item.quantity || 0);
      });
    });

    res.json({
      success: true,
      totalOrders,
      totalRevenue,
      totalPizzas,
      latestOrders: orders.slice(0, 5),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE ORDER
router.delete("/admin/delete/:id", async (req, res) => {
  try {

    const order = await Order.findByIdAndDelete(
      req.params.id
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});
module.exports = router;