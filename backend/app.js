const express = require('express');
const router = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors('https://ata.mura.io'));
app.use(express.json());
app.use(router);

module.exports = app;
