const router = require("express").Router();
const Shop = require("../models/Shop");
const logger = require("../middleware/logger");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/shops
// @desc    Get all shops with filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const query = { isActive: true };

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by floor
    if (req.query.floor) {
      query.floor = req.query.floor;
    }

    // Search by name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    const shops = await Shop.find(query)
      .populate("category", "name icon")
      .populate("floor", "name number")
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${shops.length} shops`);

    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    logger.error(`Get shops error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/shops/:id
// @desc    Get single shop
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id)
      .populate("category", "name icon description")
      .populate("floor", "name number description");

    if (!shop) {
      logger.warn(`Shop not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    logger.info(`Fetched shop: ${shop.name}`);

    res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    logger.error(`Get shop error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/shops
// @desc    Create new shop
// @access  Private (Admin)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const shop = await Shop.create(req.body);

    logger.info(`Shop created: ${shop.name}`);

    res.status(201).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    logger.error(`Create shop error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/shops/:id
// @desc    Update shop
// @access  Private (Admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shop) {
      logger.warn(`Shop not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    logger.info(`Shop updated: ${shop.name}`);

    res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    logger.error(`Update shop error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/shops/:id
// @desc    Delete shop (soft delete)
// @access  Private (Admin)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!shop) {
      logger.warn(`Shop not found for delete: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    logger.info(`Shop deleted (soft): ${shop.name}`);

    res.status(200).json({
      success: true,
      message: "Shop deleted successfully",
    });
  } catch (error) {
    logger.error(`Delete shop error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/shops/floor/:floorId
// @desc    Get shops by floor
// @access  Public
router.get("/floor/:floorId", async (req, res) => {
  try {
    const shops = await Shop.find({ floor: req.params.floorId, isActive: true })
      .populate("category", "name icon")
      .populate("floor", "name number");

    logger.info(`Fetched ${shops.length} shops for floor ${req.params.floorId}`);

    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    logger.error(`Get shops by floor error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/shops/category/:categoryId
// @desc    Get shops by category
// @access  Public
router.get("/category/:categoryId", async (req, res) => {
  try {
    const shops = await Shop.find({ category: req.params.categoryId, isActive: true })
      .populate("category", "name icon")
      .populate("floor", "name number");

    logger.info(`Fetched ${shops.length} shops for category ${req.params.categoryId}`);

    res.status(200).json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    logger.error(`Get shops by category error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
