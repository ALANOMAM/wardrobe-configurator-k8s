const { Color } = require("../models");

// Get all colors
exports.getAllColors = async (req, res) => {
  try {
    const colors = await Color.findAll();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
