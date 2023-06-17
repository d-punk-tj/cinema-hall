const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller')

// Create a cinema with N seats
router.post('/create', cinemaController.createCinema);
// Purchase a specific seat number in cinema
router.post('/purchase/:cinemaId/:seat', cinemaController.purchaseCinemaTicket);
// Purchase the first two free consecutive seats in cinema C
router.post('/purchase-consecutive/:cinemaId/', cinemaController.purchaseConsecutiveCinemaTicket)


module.exports = router;