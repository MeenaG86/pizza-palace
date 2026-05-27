const express = require("express");

const router = express.Router();

const Pizza = require("../models/Pizza");

const authMiddleware = require("../middleware/authMiddleware");


// Add Pizza
router.post(
  "/add",
  authMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        category,
        description,
        price,
        image,
      } = req.body;

      const numericPrice = Number(price);

      // FIELD VALIDATION
      if (
        !name?.trim() ||
        !category?.trim() ||
        !description?.trim() ||
        !image?.trim()
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // PRICE VALIDATION
      if (
        isNaN(numericPrice) ||
        numericPrice <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Price must be greater than 0",
        });
      }

      const pizza = new Pizza({
        name,
        category,
        description,
        price: numericPrice,
        image,
      });

      await pizza.save();

      res.status(201).json({
        success: true,
        message: "Pizza Added Successfully",
        pizza,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);


// Get All Pizzas
router.get("/", async (req, res) => {
  try {
    const pizzas = await Pizza.find();

    res.status(200).json({
      success: true,
      pizzas,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);

    if (!pizza) {
      return res.status(404).json({
        message: "No pizza found",
      });
    }

    res.json({
      success: true,
      pizza,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update Pizza
router.put("/:id", async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      image,
    } = req.body;

    const numericPrice = Number(price);

    if (
      !name?.trim() ||
      !category?.trim() ||
      !description?.trim() ||
      !image?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (
      isNaN(numericPrice) ||
      numericPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    const updatedPizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        description,
        price: numericPrice,
        image,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Pizza Updated Successfully",
      updatedPizza,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// Delete Pizza
router.delete("/:id", async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Pizza Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;