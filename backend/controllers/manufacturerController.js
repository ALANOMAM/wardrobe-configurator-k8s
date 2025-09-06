const { Manufacturer } = require("../models");

exports.getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.findAll();
    res.json(manufacturers);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
