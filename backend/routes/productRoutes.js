const router = require("express").Router();
const Product = require("../models/Product");
const logger = require("../middleware/logger");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/products
// @desc    Get all products with filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const query = { isActive: true };

    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Filter by shop
    if (req.query.shop) {
      query.shop = req.query.shop;
    }

    // Filter by offer
    if (req.query.hasOffer === "true") {
      query.hasOffer = true;
    }

    // Search by name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: "i" };
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // Brand filter
    if (req.query.brand) {
      query.brand = { $regex: req.query.brand, $options: "i" };
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (req.query.sort) {
      switch (req.query.sort) {
        case "price_asc":
          sortOption = { price: 1 };
          break;
        case "price_desc":
          sortOption = { price: -1 };
          break;
        case "rating":
          sortOption = { rating: -1 };
          break;
        case "name":
          sortOption = { name: 1 };
          break;
      }
    }

    const products = await Product.find(query)
      .populate("category", "name icon")
      .populate("shop", "name floor")
      .populate("offer", "title discountType discountValue")
      .sort(sortOption);

    logger.info(`Fetched ${products.length} products`);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    logger.error(`Get products error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/products/offers
// @desc    Get products with offers
// @access  Public
router.get("/offers", async (req, res) => {
  try {
    const products = await Product.find({ hasOffer: true, isActive: true })
      .populate("category", "name icon")
      .populate("shop", "name floor")
      .populate("offer", "title discountType discountValue startDate endDate")
      .sort({ createdAt: -1 });

    logger.info(`Fetched ${products.length} products with offers`);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    logger.error(`Get products with offers error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/products/compare
// @desc    Compare products
// @access  Public
router.get("/compare", async (req, res) => {
  try {
    const { ids } = req.query;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: "Please provide product IDs to compare",
      });
    }

    const productIds = ids.split(",");

    if (productIds.length < 2 || productIds.length > 4) {
      return res.status(400).json({
        success: false,
        message: "Please provide 2 to 4 products for comparison",
      });
    }

    const products = await Product.find({ _id: { $in: productIds } })
      .populate("category", "name")
      .populate("shop", "name floor")
      .populate("offer", "title discountType discountValue");

    logger.info(`Comparing ${products.length} products`);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    logger.error(`Compare products error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name icon description")
      .populate("shop", "name floor location contactPhone contactEmail")
      .populate("offer", "title discountType discountValue startDate endDate termsAndConditions");

    if (!product) {
      logger.warn(`Product not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.info(`Fetched product: ${product.name}`);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Get product error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Admin)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.create(req.body);

    logger.info(`Product created: ${product.name}`);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Create product error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      logger.warn(`Product not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.info(`Product updated: ${product.name}`);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Update product error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (soft delete)
// @access  Private (Admin)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      logger.warn(`Product not found for delete: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    logger.info(`Product deleted (soft): ${product.name}`);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    logger.error(`Delete product error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
