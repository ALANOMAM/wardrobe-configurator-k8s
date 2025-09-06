const { Wardrobe } = require("../models");

// Get all wardrobes (already done)
exports.getAllWardrobes = async (req, res) => {
  try {
    const wardrobes = await Wardrobe.findAll();
    res.json(wardrobes);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Get a single wardrobe by ID
exports.getWardrobeById = async (req, res) => {
  try {
    const wardrobe = await Wardrobe.findByPk(req.params.id);
    if (!wardrobe) return res.status(404).json({ error: "Wardrobe not found" });
    res.json(wardrobe);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create a new wardrobe
exports.createWardrobe = async (req, res) => {
  try {
    const {
      production_code,
      technician_name,
      manufacturer_id,
      client_name,
      client_address,
      client_phone,
      client_email,
    } = req.body;
    const wardrobe = await Wardrobe.create({
      production_code,
      technician_name,
      manufacturer_id,
      client_name,
      client_address,
      client_phone,
      client_email,
    });
    res.status(201).json(wardrobe);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
};

// Update an existing wardrobe
exports.updateWardrobe = async (req, res) => {
  try {
    const {
      production_code,
      technician_name,
      manufacturer_id,
      client_name,
      client_address,
      client_phone,
      client_email,
    } = req.body;

    const wardrobe = await Wardrobe.findByPk(req.params.id);
    if (!wardrobe) return res.status(404).json({ error: "Wardrobe not found" });

    // Update this field only if the request actually contains a new value for it. Otherwise, keep the existing one
    wardrobe.production_code = production_code ?? wardrobe.production_code;
    wardrobe.technician_name = technician_name ?? wardrobe.technician_name;
    wardrobe.manufacturer_id = manufacturer_id ?? wardrobe.manufacturer_id;
    wardrobe.client_name = client_name ?? wardrobe.client_name;
    wardrobe.client_address = client_address ?? wardrobe.client_address;
    wardrobe.client_phone = client_phone ?? wardrobe.client_phone;
    wardrobe.client_email = client_email ?? wardrobe.client_email;

    await wardrobe.save();

    res.json(wardrobe);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid data", details: err.message });
  }
};

// Delete a wardrobe
exports.deleteWardrobe = async (req, res) => {
  try {
    const wardrobe = await Wardrobe.findByPk(req.params.id);
    if (!wardrobe) return res.status(404).json({ error: "Wardrobe not found" });

    await wardrobe.destroy();
    res.json({ message: "Wardrobe deleted" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
