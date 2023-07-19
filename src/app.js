const express = require('express');
const router = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('express-async-error');

const app = express();

app.use(cors());
app.use(helmet());
app.use(rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from same IP'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

module.exports = app;
