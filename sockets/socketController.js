const TicketControl = require('../models/ticketControl');

const ticketControl = new TicketControl();

const socketController = (socket, io) => {

 console.log('Cliente conectado');


 // tickets pendientes
 socket.emit('tickets-pendientes', ticketControl.tickets.length);

 // últimos 4
 socket.emit('ultimos4', ticketControl.ultimos4);


 // generar ticket
 socket.on('siguiente-ticket', (payload, callback) => {

  const siguiente = ticketControl.siguiente();

  callback(siguiente);

  io.emit('tickets-pendientes', ticketControl.tickets.length);

 });


 // atender ticket
 socket.on('atender-ticket', ({ escritorio }, callback) => {

  if (!escritorio) {
   return callback({
    ok: false,
    msg: 'El escritorio es obligatorio'
   });
  }

  const ticket = ticketControl.atenderTicket(escritorio);

  callback(ticket);

  io.emit('tickets-pendientes', ticketControl.tickets.length);

  io.emit('ultimos4', ticketControl.ultimos4);

 });

};

module.exports = {
 socketController
};
