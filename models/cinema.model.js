const mongoose = require('mongoose');

// Define Cinema schema
const cinemaSchema = new mongoose.Schema({
    seats: [Number],
    limit: Number
  });
  
const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = {
    Cinema
}