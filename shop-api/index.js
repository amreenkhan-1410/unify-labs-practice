const express = require("express");
const connectDB = require("./db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Shop API is running on MongoDB Atlas ☁️");
});

app.get("/products", async (req, res) => {
  try {
    const db = await connectDB();
    const products = await db.collection("products").find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
