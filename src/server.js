const express = require('express');

const app = express();

app.get('/', (req, res) => {
  const {
    time, intemp, temp, feelslike, dew, inhum, hum, pressure,
  } = req.query;
  console.log('time: ', new Date(parseInt(time, 10)));
  console.log('intemp: ', intemp);
  console.log('temp: ', temp);
  console.log('feelslike: ', feelslike);
  console.log('dewpoint: ', dew);
  console.log('inhum: ', inhum);
  console.log('hum: ', hum);
  console.log('pressure: ', pressure);
  res.status(200).json({
    message: 'OK',
  });
});

const server = app.listen(3000, () => {
  console.log(`Cumulus proxy istening on port: ${server.address().port}`);
});
