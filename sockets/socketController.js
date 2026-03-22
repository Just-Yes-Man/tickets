const BandaControl = require('../models/bandaControl');

const bandaControl = new BandaControl();

const emitirEstado = (io) => {
 io.emit('pasos-pendientes', bandaControl.pasosPendientes.length);
 io.emit('ultimas-revisiones', bandaControl.ultimasRevisiones);
};

const socketController = async (socket, io) => {
 console.log('Cliente conectado');

 try {
  if (!bandaControl.monitoresActivos) {
   await bandaControl.inicializarDesdeDB();
  }

  socket.emit('monitores-activos', bandaControl.monitoresActivos);
  socket.emit('pasos-pendientes', bandaControl.pasosPendientes.length);
  socket.emit('ultimas-revisiones', bandaControl.ultimasRevisiones);

  socket.on('registrar-paso-producto', async (payload, callback) => {
   try {
    const registro = await bandaControl.registrarPasoProducto(payload);

    callback(registro);

    if (registro.ok) {
     emitirEstado(io);
    }
   } catch (error) {
    callback({
     ok: false,
     msg: 'No se pudo registrar el paso del producto'
    });
   }
  });

  socket.on('revisar-siguiente-producto', ({ monitorId }, callback) => {
   if (!monitorId) {
    return callback({
     ok: false,
     msg: 'El monitor es obligatorio'
    });
   }

   const revision = bandaControl.revisarSiguienteProducto(monitorId);

   callback({
    ok: true,
    revision
   });

   emitirEstado(io);
  });
 } catch (error) {
  socket.emit('estado-inicial-error', {
   ok: false,
   msg: 'No se pudo cargar el estado inicial de la banda'
  });
 }
};

module.exports = {
 socketController
};
