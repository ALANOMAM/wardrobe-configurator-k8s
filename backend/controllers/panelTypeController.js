const { PanelType } = require("../models");

// Get all panel types
exports.getAllPanelTypes = async (req, res) => {
  try {
    const panelTypes = await PanelType.findAll();
    res.json(panelTypes);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
