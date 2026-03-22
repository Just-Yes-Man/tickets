const express = require('express');
const http = require('http');

class Server {

 constructor() {

  this.app = express();
  this.port = 1200;

  this.server = http.createServer(this.app);

 }

 middlewares() {
  this.app.use(express.json());
  this.app.use(express.static('public'));
 }

 routes() {
  this.app.get('/api/health', (req, res) => {
   res.json({ ok: true, servicio: 'bandas-transportadoras' });
  });
 }

 listen() {

  this.middlewares();
  this.routes();

  this.server.listen(this.port, () => {
   console.log('Servidor corriendo en puerto', this.port);
  });

 }

}

module.exports = Server;
