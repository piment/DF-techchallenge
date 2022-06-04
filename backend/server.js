require('dotenv').config()
const app = require('./app.js');
const port = process.env.BACKEND_PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
