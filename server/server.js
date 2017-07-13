const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('*', (req, res) => {
  res.send(200);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

module.exports = app;
