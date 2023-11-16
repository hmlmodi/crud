const express = require('express');
const route = express.Router();

route.use('/api', require('./v1/index'));

module.exports = route;
