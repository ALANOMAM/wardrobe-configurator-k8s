const express = require("express");
const router = express.Router();
const panelTypeController = require("../controllers/panelTypeController");

router.get("/", panelTypeController.getAllPanelTypes);

module.exports = router;
