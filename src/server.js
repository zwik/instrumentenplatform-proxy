const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const inTemp = req.query.intemp;
  console.log(`binnentemperatuur: ${inTemp}`);
  res.send('hello world');
});

const server = app.listen(3000, () => {
  console.log(`Listen on http://${server.address().address}:${server.address().port}`);
});
