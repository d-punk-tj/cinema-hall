const Cinema = require('../models/cinema.model').Cinema;

// Helper function to reserve seats
async function reserveSeats(cinemaId, seats) {
    try {
      const cinema = await Cinema.findById(cinemaId);
      if (!cinema) {
        throw new Error('Cinema not found');
      }
  
      const reservedSeats = cinema.seats.filter(seat => seats.includes(seat));
      if (reservedSeats.length > 0) {
        throw new Error(`Seat(s) ${reservedSeats.join(', ')} already purchased`);
      }
  
      cinema.seats = [...cinema.seats, ...seats];
      await cinema.save();
  
      return seats;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {
    reserveSeats
  }