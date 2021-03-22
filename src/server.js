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
    time, intemp, inhum, pressure,
  } = req.query;
  // console.log('time: ', new Date(parseInt(time, 10)));
  // console.log('intemp: ', intemp);
  // console.log('temp: ', temp);
  // console.log('feelslike: ', feelslike);
  // console.log('dewpoint: ', dew);
  // console.log('inhum: ', inhum);
  // console.log('hum: ', hum);
  // console.log('pressure: ', pressure);

  const INSERT_INSIDE_VALUES = gql`
    mutation insertInsideValues($datetime: Date!, $temperature: Float, $humidity: Float, $pressure: Float) {
      insertInsideValues(datetime: $datetime, temperature: $temperature, humidity: $humidity, pressure: $pressure)
    }
  `;

  try {
    await axios.post(endpoint, {
      query: print(INSERT_INSIDE_VALUES),
      variables: {
        datetime: parseInt(time, 10),
        temperature: parseInt(intemp.replace(',', '.'), 10),
        humidity: parseInt(inhum.replace(',', '.'), 10),
        pressure: parseInt(pressure.replace(',', '.'), 10),
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
  console.log(`Cumulus proxy istening on port: ${server.address().port}`);
});
