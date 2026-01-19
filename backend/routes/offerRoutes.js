const router = require("express").Router();
const Offer = require("../models/Offer");
const Product = require("../models/Product");
const logger = require("../middleware/logger");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/offers
// @desc    Get all active offers
// @access  Public
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const query = {
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    };

    // Filter by shop
    if (req.query.shop) {
      query.shop = req.query.shop;
    }

    const offers = await Offer.find(query)
      .populate("shop", "name floor category")
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${offers.length} active offers`);

    res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    logger.error(`Get offers error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/offers/all
// @desc    Get all offers (admin)
// @access  Private (Admin)
router.get("/all", protect, authorize("admin"), async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate("shop", "name floor category")
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${offers.length} total offers (admin)`);

    res.status(200).json({
      success: true,
      count: offers.length,
      data: offers,
    });
  } catch (error) {
    logger.error(`Get all offers error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/offers/:id
// @desc    Get single offer
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("shop", "name floor category location contactPhone");

    if (!offer) {
      logger.warn(`Offer not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Get products with this offer
    const products = await Product.find({ offer: req.params.id, isActive: true })
      .populate("category", "name")
      .populate("shop", "name")
      .limit(10);

    logger.info(`Fetched offer: ${offer.title}`);

    res.status(200).json({
      success: true,
      data: {
        ...offer.toObject(),
        products,
      },
    });
  } catch (error) {
    logger.error(`Get offer error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/offers
// @desc    Create new offer
// @access  Private (Admin)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const offer = await Offer.create(req.body);

    logger.info(`Offer created: ${offer.title}`);

    res.status(201).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    logger.error(`Create offer error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/offers/:id
// @desc    Update offer
// @access  Private (Admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      logger.warn(`Offer not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    logger.info(`Offer updated: ${offer.title}`);

    res.status(200).json({
      success: true,
      data: offer,
    });
  } catch (error) {
    logger.error(`Update offer error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/offers/:id
// @desc    Delete offer (soft delete)
// @access  Private (Admin)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!offer) {
      logger.warn(`Offer not found for delete: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    // Remove offer from products
    await Product.updateMany(
      { offer: req.params.id },
      { $set: { hasOffer: false, offer: null } }
    );

    logger.info(`Offer deleted (soft): ${offer.title}`);

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    logger.error(`Delete offer error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/offers/:id/apply
// @desc    Apply offer to products
// @access  Private (Admin)
router.post("/:id/apply", protect, authorize("admin"), async (req, res) => {
  try {
    const { productIds } = req.body;

    if (!productIds || !productIds.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide product IDs",
      });
    }

    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({
        success: false,
        message: "Offer not found",
      });
    }

    await Product.updateMany(
      { _id: { $in: productIds } },
      { $set: { hasOffer: true, offer: req.params.id } }
    );

    logger.info(`Offer ${offer.title} applied to ${productIds.length} products`);

    res.status(200).json({
      success: true,
      message: `Offer applied to ${productIds.length} products`,
    });
  } catch (error) {
    logger.error(`Apply offer error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
