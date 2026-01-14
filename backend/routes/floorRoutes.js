const router = require("express").Router();
const Floor = require("../models/Floor");
const logger = require("../middleware/logger");
const { protect, authorize } = require("../middleware/auth");

// @route   GET /api/floors
// @desc    Get all floors
// @access  Public
router.get("/", async (req, res) => {
  try {
    const floors = await Floor.find({ isActive: true }).sort({ number: 1 });

    logger.info(`Fetched ${floors.length} floors`);

    res.status(200).json({
      success: true,
      count: floors.length,
      data: floors,
    });
  } catch (error) {
    logger.error(`Get floors error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/floors/:id
// @desc    Get single floor
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const floor = await Floor.findById(req.params.id);

    if (!floor) {
      logger.warn(`Floor not found: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    logger.info(`Fetched floor: ${floor.name}`);

    res.status(200).json({
      success: true,
      data: floor,
    });
  } catch (error) {
    logger.error(`Get floor error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/floors
// @desc    Create new floor
// @access  Private (Admin)
router.post("/", protect, authorize("admin"), async (req, res) => {
  try {
    const floor = await Floor.create(req.body);

    logger.info(`Floor created: ${floor.name}`);

    res.status(201).json({
      success: true,
      data: floor,
    });
  } catch (error) {
    logger.error(`Create floor error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/floors/:id
// @desc    Update floor
// @access  Private (Admin)
router.put("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!floor) {
      logger.warn(`Floor not found for update: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    logger.info(`Floor updated: ${floor.name}`);

    res.status(200).json({
      success: true,
      data: floor,
    });
  } catch (error) {
    logger.error(`Update floor error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/floors/:id
// @desc    Delete floor (soft delete)
// @access  Private (Admin)
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const floor = await Floor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!floor) {
      logger.warn(`Floor not found for delete: ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Floor not found",
      });
    }

    logger.info(`Floor deleted (soft): ${floor.name}`);

    res.status(200).json({
      success: true,
      message: "Floor deleted successfully",
    });
  } catch (error) {
    logger.error(`Delete floor error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
