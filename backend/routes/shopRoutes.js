
const router = require("express").Router();
const Shop = require("../models/Shop");

router.post("/", async (req,res)=>{
  res.json(await Shop.create(req.body));
});

router.get("/", async (req,res)=>{
  res.json(await Shop.find());
});

module.exports = router;
