const router = require("express").Router();
const Category = require("../models/Category");
const logger = require("../middleware/logger");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });

    logger.info(`Fetched ${categories.length} categories`);

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    logger.error(`Get categories error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      logger.warn(`Category not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    logger.info(`Fetched category: ${category.name}`);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Get category error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/categories
// @desc    Create new category
// @access  Private (Admin)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const category = await Category.create(req.body);

    logger.info(`Category created: ${category.name}`);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Create category error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private (Admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      logger.warn(`Category not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    logger.info(`Category updated: ${category.name}`);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Update category error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category (soft delete)
// @access  Private (Admin)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!category) {
      logger.warn(`Category not found for delete: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    logger.info(`Category deleted (soft): ${category.name}`);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    logger.error(`Delete category error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
