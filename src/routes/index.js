const express = require('express');
const people = require('./people');

const router = express.Router();

router.use('/people', people);

module.exports = router;
