const express = require('express');
const app = express();

const cinemaRoutes = require('./cinemaRoutes');

app.prefix('/cinema', function (router) { 
    router.use('', cinemaRoutes);
});


module.exports = app;