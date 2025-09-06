const express = require("express");
const router = express.Router({ mergeParams: true });
const panelController = require("../controllers/panelController");

// Nested routes under /wardrobes/:wardrobeId/panels
router.get("/", panelController.getAllPanels);
router.get("/:id", panelController.getPanelById);
router.post("/", panelController.createPanel);
router.put("/:id", panelController.updatePanel);
router.delete("/:id", panelController.deletePanel);

module.exports = router;
