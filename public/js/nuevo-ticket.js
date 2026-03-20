const socket = io();

const btn = document.querySelector('#btnCrear');
const lbl = document.querySelector('#lblNuevoTicket');

socket.on('connect', () => {
 console.log('conectado');
});

btn.addEventListener('click', () => {

 socket.emit('siguiente-ticket', null, (ticket) => {

  lbl.innerText = ticket;

 });

});
