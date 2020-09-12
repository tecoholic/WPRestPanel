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

module.exports = app;
