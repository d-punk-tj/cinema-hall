const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller')

router.post('/create', cinemaController.createCinema);

module.exports = router;