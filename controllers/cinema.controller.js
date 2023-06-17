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

exports.purchaseCinemaTicket = async (req, res) => {
    const { cinemaId, seat } = req.params;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }

    if (cinema.seats.includes(Number(seat))) {
      return res.status(400).json({ error: 'Seat already purchased' });
    }

    cinema.seats.push(Number(seat));
    await cinema.save();

    res.json({ seat });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase seat' });
  }
};