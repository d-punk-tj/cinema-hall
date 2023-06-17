const Cinema = require('../models/cinema.model').Cinema;

exports.createCinema = async (req, res) => {
    const seats = req.body.seats;

    try {
      const cinema = await Cinema({ seats });
      await cinema.save();
  
      res.json({ cinemaId: cinema._id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create cinema:' + error });
    }
  };