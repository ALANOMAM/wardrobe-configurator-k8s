const { Panel } = require("../models");

// Get all panels in a wardrobe
exports.getAllPanels = async (req, res) => {
  try {
    const { wardrobeId } = req.params;
    const panels = await Panel.findAll({
      where: { wardrobe_id: wardrobeId },
    });
    res.json(panels);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a single panel by ID within a wardrobe
exports.getPanelById = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;
    const panel = await Panel.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!panel)
      return res
        .status(404)
        .json({ error: "Panel not found in this wardrobe" });

    res.json(panel);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new panel within a wardrobe
exports.createPanel = async (req, res) => {
  try {
    const { width, height, depth, color_id, panel_type_id } = req.body;
    const { wardrobeId } = req.params;

    const panel = await Panel.create({
      width,
      height,
      depth,
      color_id,
      wardrobe_id: wardrobeId, // force wardrobe_id from params
      panel_type_id,
    });

    res.status(201).json(panel);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Update an existing panel within a wardrobe
exports.updatePanel = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;
    const { width, height, depth, color_id, panel_type_id } = req.body;

    const panel = await Panel.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!panel)
      return res
        .status(404)
        .json({ error: "Panel not found in this wardrobe" });

    panel.width = width ?? panel.width;
    panel.height = height ?? panel.height;
    panel.depth = depth ?? panel.depth;
    panel.color_id = color_id ?? panel.color_id;
    panel.panel_type_id = panel_type_id ?? panel.panel_type_id;

    await panel.save();

    res.json(panel);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Delete a panel within a wardrobe
exports.deletePanel = async (req, res) => {
  try {
    const { id, wardrobeId } = req.params;

    const panel = await Panel.findOne({
      where: {
        id,
        wardrobe_id: wardrobeId,
      },
    });

    if (!panel)
      return res
        .status(404)
        .json({ error: "Panel not found in this wardrobe" });

    await panel.destroy();
    res.json({ message: "Panel deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
