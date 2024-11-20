const express = require('express');
const Item = require('../models/item');
const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();  // Retrieve all items
    res.status(200).json(items);       // Send items as response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { name, designation, empId, empCode, empEmailId, role, mobile } = req.body;

  // Validate input
  if (!name || !designation) { // Replace 'description' with 'designation'
    return res.status(400).json({ message: 'Please provide both name and designation' });
  }

  try {
    const newItem = new Item({ name, designation, empId, empCode, empEmailId, role, mobile });
    await newItem.save(); // Save new item to database
    res.status(201).json(newItem); // Send back the saved item
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error });
  }
});


// Get a single item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);  // Find item by ID
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);  // Send the item as response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
});

//  Update API
router.put('/:empId', async (req, res) => {
  const { id } = req.params;
  const { name, designation,empId,empCode,empEmailId,role,mobile } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, designation,empId,empCode,empEmailId,role,mobile },
      { new: true }  // Return the updated item
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);  // Send the updated item
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});
// Delete API
router.delete('/:empId', async (req, res) => {
  const { empId } = req.params; // Get empId from the request

  try {
    const deletedItem = await Item.findOneAndDelete({ empId }); // Find and delete using empId
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting item', error });
  }
});

module.exports = router;
