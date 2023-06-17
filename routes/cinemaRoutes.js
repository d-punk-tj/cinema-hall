const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller')

router.post('/create', cinemaController.createCinema);
router.post('/purchase/:cinemaId/:seat', cinemaController.purchaseCinemaTicket);


module.exports = router;