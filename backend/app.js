require('dotenv').config()
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
app.use(cors(process.env.BACKEND_URL));
app.use(express.json());
app.use(router);

module.exports = app;
