const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const MenuItem = require("./schema");

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST /menu - Add a new menu item
app.post("/menu", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || price == null) {
      return res.status(400).json({ error: "Name and price are required" });
    }
    const newItem = new MenuItem({ name, description, price });
    await newItem.save();
    res.status(201).json({ message: "Menu item added", item: newItem });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /menu - Fetch all menu items
app.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
