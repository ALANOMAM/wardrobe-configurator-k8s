const express = require("express");
const router = express.Router();
const wardrobeController = require("../controllers/wardrobeController");

router.get("/", wardrobeController.getAllWardrobes);
router.get("/:id", wardrobeController.getWardrobeById);
router.post("/", wardrobeController.createWardrobe);
router.put("/:id", wardrobeController.updateWardrobe);
router.delete("/:id", wardrobeController.deleteWardrobe);

// Nested panels routes
const panelsRouter = require("./panels.routes");
router.use("/:wardrobeId/panels", panelsRouter);

module.exports = router;
