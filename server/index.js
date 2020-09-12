/**
 * Created by sridharrajs.
 */

const chalk = require('chalk');
const dotenv = require('dotenv').config();

if (dotenv.error) {
  console.trace(chalk.red('.env file is missing'));
  process.exit(0);
}

const { PORT } = process.env;
const connectionFactory = require('./app/boot/connection-factory');

connectionFactory.connect().then((info) => {
  console.log('Connecting DB ', chalk.blue(info));
}).then(() => {
  const models = require('./app/models');// eslint-disable-line global-require
  return models.init();
}).then(() => {
  const server = require('./app/boot/build-server');
  return server.start();
}).then((info) => {
  console.log(`Starting Server at ${chalk.green(PORT)}`, chalk.blue(info));
}).catch((error) => {
  console.trace(chalk.red(error));
  console.trace(chalk.red(error.message));
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.trace(error.stack);
});
