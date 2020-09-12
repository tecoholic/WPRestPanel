const http = require('http');

const app = require('../app');

class Server {
  static start() {
    const server = http.createServer(app);
    return new Promise((resolve, reject) => {
      const { PORT } = process.env;
      server.listen(PORT, () => {
        resolve('success');
      }).on('error', (err) => {
        reject(err);
      });
    });
  }
}

module.exports = Server;
