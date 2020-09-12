const cors = require('cors');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.get('/', (req, res) => {
  return res.status(200).send({
    msg: 'server is up'
  });
});

app.use('/onboard', require('./routes/onboard-route'));

app.use(function (err, req, res, next) {
  console.log(88888)
  if (err instanceof NotFound) {
    res.status(404).send({
      msg: 'API not found!'
    });
  } else {
    console.log(err.stack);
    res.status(500).send({
      msg: 'Something broke!'
    });
  }
});

module.exports = app;
