const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const pizzaRoutes = require("./routes/pizzaRoutes");

const orderRoutes = require("./routes/orderRoutes");


const app = express();


// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://pizza-palace-ebon.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/pizzas", pizzaRoutes);

app.use("/api/orders", orderRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Pizza Palace API Running");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});