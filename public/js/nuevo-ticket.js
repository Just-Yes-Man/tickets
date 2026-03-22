const socket = io();

const qrInput = document.querySelector('#qr');
const pesoInput = document.querySelector('#peso');
const colorInput = document.querySelector('#color');
const alturaInput = document.querySelector('#altura');
const canalInput = document.querySelector('#canal');
const resultado = document.querySelector('#resultado');
const btnRegistrar = document.querySelector('#btnRegistrar');

btnRegistrar.addEventListener('click', () => {
 const payload = {
  qr: qrInput.value.trim(),
  peso: Number(pesoInput.value),
  color: colorInput.value.trim(),
  altura: Number(alturaInput.value),
  canal: canalInput.value.trim() || '1'
 };

 socket.emit('registrar-paso-producto', payload, (res) => {
  if (!res.ok) {
   resultado.innerText = `❌ ${res.msg}`;
   return;
  }

  resultado.innerText = `✅ Paso #${res.paso.idPaso} registrado para ${res.paso.modelo.tipo}`;
 });
});
