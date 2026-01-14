
const router = require("express").Router();
const Product = require("../models/Product");

router.post("/", async (req,res)=>{
  res.json(await Product.create(req.body));
});

router.get("/", async (req,res)=>{
  const q = {};
  if(req.query.category) q.category = req.query.category;
  if(req.query.floor) q.floor = req.query.floor;
  res.json(await Product.find(q));
});

module.exports = router;
