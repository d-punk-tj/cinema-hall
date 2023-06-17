const Cinema = require('../models/cinema.model').Cinema;
const helper = require('../services/helper');

exports.createCinema = async (req, res) => {
    const seats = req.body.seats;

    try {
      const cinema = await Cinema({ limit: seats });
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

    if(seat > cinema.limit) {
        return res.status(400).json({ error: 'Seat Not Available' });
    }

    cinema.seats.push(Number(seat));
    await cinema.save();

    res.json({ seat });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase seat' });
  }
};

exports.purchaseConsecutiveCinemaTicket = async (req, res) => {
    const { cinemaId } = req.params;

  try {
    const cinema = await Cinema.findById(cinemaId);
    if (!cinema) {
      return res.status(404).json({ error: 'Cinema not found' });
    }

    for(let i = 1; i < cinema.limit; i++){
        if(!cinema.seats.includes(Number(i)) && !cinema.seats.includes(Number(i + 1)) ){
            await helper.reserveSeats(cinemaId, [i, i+1]);
            return res.status(200).json({'seats booked' : [i, i+1] })
        }
    }

    res.status(500).json({ error: 'No Consecutive seats available' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase seats' + error });
  }
};