const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Everything ok');
});

module.exports = router;
