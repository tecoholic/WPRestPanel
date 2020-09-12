const mongoose = require('mongoose');

const db = mongoose;

db.Promise = global.Promise;

class ConnectionFactory {

  static connect() {
    const {MONGO_URL} = process.env;
    db.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return new Promise((resolve, reject) => {
      db.connection.on('open', () => {
        resolve('CONNECTION SUCCESS');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

  static disconnect() {
    db.connection.close();
    return new Promise((resolve, reject) => {
      db.connection.on('disconnected', () => {
        resolve('DISCONNECT SUCCESS');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }

}

module.exports = ConnectionFactory;
