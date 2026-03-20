const socket = io();

const lbl = document.querySelector('#ticket');
const btn = document.querySelector('#btnAtender');
const pendientes = document.querySelector('#pendientes');

const escritorio = prompt("Número de escritorio");

document.querySelector('#titulo').innerText = "Desk " + escritorio;


// actualizar tickets pendientes
socket.on('tickets-pendientes', (numero) => {

 pendientes.innerText = numero;

});


btn.addEventListener('click', () => {

 socket.emit('atender-ticket',{ escritorio }, (ticket) => {

  if(!ticket){
   lbl.innerText = "Nadie";
   return;
  }

  lbl.innerText = "Ticket " + ticket.numero;

 });

});
