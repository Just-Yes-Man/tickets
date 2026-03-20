const socket = io();

const ticketPrincipal = document.querySelector('#ticketPrincipal');
const deskPrincipal = document.querySelector('#deskPrincipal');
const lista = document.querySelector('#listaTickets');

socket.on('ultimos4', (tickets)=>{

 if(tickets.length === 0) return;

 const [primero,...resto] = tickets;

 ticketPrincipal.innerText = "Ticket " + primero.numero;
 deskPrincipal.innerText = "Desk " + primero.escritorio;

 lista.innerHTML = "";

 resto.forEach(ticket=>{

  lista.innerHTML += `
   <div class="ticket">
    Ticket ${ticket.numero}<br>
    Desk ${ticket.escritorio}
   </div>
  `;

 });

});
