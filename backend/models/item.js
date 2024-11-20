const mongoose = require('mongoose');

// Define the item schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  empId:{
    type:String,
    required:true,
    unique:true
  },
  empCode:{
    type:String,
    required:true
  },
  empEmailId:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    required:true
  },
  mobile:{
    type:String,
    required:true
  }  


});

// Create the Item model based on the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
