const express = require('express');
const app = express();
require('dotenv').config();
var Twitter = require('twitter');

app.get('/tweets/:id', (req, res) => {
  var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_ECRET,
    bearer_token: process.env.BEARED_TOKEN,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  client.get(
    'statuses/user_timeline',
    {
      screen_name: 'nodejs',
      user_id: req.params.id,
      count: 5
    },
    function(error, tweets, response) {
      if (error) {
        console.log(error);
        return;
      }

      res.set('Content-Type', 'application/json');
      res.set('access-control-allow-origin', '*');
      res.json(tweets);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log('Servidor escuchando en el puerto', process.env.PORT);
});
