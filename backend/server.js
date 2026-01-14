const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"));

app.use("/api/shops", require("./routes/shopRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Backend running on port ${process.env.PORT}`)
);
