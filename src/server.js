const express = require('express');
const { print } = require('graphql');
const gql = require('graphql-tag');
const axios = require('axios');

const app = express();

axios.defaults.baseURL = 'http://server:4000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const endpoint = '/graphql';

app.get('/', async (req, res) => {
  const {
    time,
    temperature,
    insidetemperature,
    dewpoint,
    feelslike,
    humidity,
    insidehumidity,
    pressure,
    windspeed,
    winddirection,
    rate,
  } = req.query;
  // console.log('time: ', new Date(parseInt(time, 10)));
  // console.log('intemp: ', intemp);
  // console.log('temp: ', temp);
  // console.log('feelslike: ', feelslike);
  // console.log('dewpoint: ', dew);
  // console.log('inhum: ', inhum);
  // console.log('hum: ', hum);
  // console.log('pressure: ', pressure);

  const INSERT_VALUES = gql`
    mutation InsertValues($datetime: Date!, $temperature: Float, $insidetemperature: Float, $dewpoint: Float, $feelslike: Float, $humidity: Float, $insidehumidity: Float, $pressure: Float, $windspeed: Float, $winddirection: Float, $rate: Float) {
      insertTemperatureValues(datetime: $datetime, temperature: $temperature, insidetemperature: $insidetemperature, dewpoint: $dewpoint, feelslike: $feelslike)
      insertAirValues(datetime: $datetime, humidity: $humidity, insidehumidity: $insidehumidity, pressure: $pressure, windspeed: $windspeed, winddirection: $winddirection)
      insertRainValues(datetime: $datetime, rate: $rate)
    }
  `;

  try {
    await axios.post(endpoint, {
      query: print(INSERT_VALUES),
      variables: {
        datetime: parseInt(time, 10),
        temperature: parseInt(temperature.replace(',', '.'), 10),
        insidetemperature: parseInt(insidetemperature.replace(',', '.'), 10),
        dewpoint: parseInt(dewpoint.replace(',', '.'), 10),
        feelslike: parseInt(feelslike.replace(',', '.'), 10),
        humidity: parseInt(humidity.replace(',', '.'), 10),
        insidehumidity: parseInt(insidehumidity.replace(',', '.'), 10),
        pressure: parseInt(pressure.replace(',', '.'), 10),
        windspeed: parseInt(windspeed.replace(',', '.'), 10),
        winddirection: parseInt(winddirection.replace(',', '.'), 10),
        rate: parseInt(rate.replace(',', '.'), 10),
      },
    });
  } catch (err) {
    console.log('An error occured: ', err);
  }

  res.status(200).json({
    message: 'OK',
  });
});

const server = app.listen(3000, () => {
  console.log(`Cumulus proxy is listening on port: ${server.address().port}`);
});
