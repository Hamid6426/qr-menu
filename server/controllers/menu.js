const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Menu = require("../models/Menu");
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const path = require("path");

//Create New Menu
exports.createMenu = async (req, res) => {
  const { title, description, price, category } = req.body;
  const img = req.file ? req.file.path : "";
  const store = req.user.storeId;

  try {
    if (!title || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if there are existing categories for the store
    let menu = await Menu.findOne({ store });

    if (menu) {
      // Check if the category already exists
      if (!menu.categories.name.includes(category)) {
        // Add the new category to the categories array
        menu.categories.name.push(category);
        await menu.save();
      }
    } else {
      // If no menu exists for the store, create an empty categories field for future updates
      menu = new Menu({
        title: "",
        description: "",
        price: 0,
        img: "",
        category: "",
        categories: { name: [] },
        store,
      });
      if (!menu.categories.name.includes(category)) {
        menu.categories.name.push(category);
      }
      await menu.save();
    }

    // Create a new menu item
    const newMenu = new Menu({
      title,
      description,
      price,
      img,
      category,
      categories: menu.categories,
      store,
    });

    await newMenu.save();

    res.status(201).json({ message: "Menu item created successfully.", data: newMenu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
}
}

//Get all Menu Items of the Store
exports.getMenu = async (req, res) => {
  try {
    const store = req.params.store
    const menu = await Menu.find({ store })
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
}

// Delete Menu
exports.deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    await Menu.findByIdAndDelete(id);
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu" });
  }
}

//Update Menu
exports.updateMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, price, category } = req.body;
    const img = req.file ? req.file.path : null; // Check if new image is uploaded

    // Build the update object
    const updateData = {
      title,
      description,
      price,
      category,
    };

    if (img) updateData.img = img; // If there's a new image, update it

    // Update the menu item
    const updatedMenu = await Menu.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json({ message: "Menu updated successfully", menu: updatedMenu });
  } catch (error) {
    res.status(500).json({ message: "Error updating menu", error });
  }
};
