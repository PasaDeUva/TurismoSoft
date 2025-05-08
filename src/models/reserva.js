const EstadoReserva = require('../util/estado-reserva.js');

class Reserva {

  static EstadoReserva = {
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada',
    VENCIDA: 'vencida'
  }

  constructor(experiencia, cliente, fechaExperiencia, cantPersonas) {
    this._id = crypto.randomUUID();
    this._experiencia = experiencia;
    this._cliente = cliente;
    this._fechaReserva = new Date(); // Fecha actual
    this._fechaExperiencia = fechaExperiencia;
    this._cantPersonas = cantPersonas;
    this._estado = EstadoReserva.PENDIENTE;
    this._montoTotal = this.calcularMontoTotal();
    this._fechaLimitePago = this.calcularFechaLimitePago();
  }

  calcularMontoTotal() {
    let precioBase = this._experiencia.calcularCostoTotal(this._cantPersonas);

    return precioBase;
  }

  calcularFechaLimitePago() {
    const fechaLimite = new Date(this._fechaReserva);
    fechaLimite.setDate(fechaLimite.getDate() + 7);
    return fechaLimite;
  }

  confirmarReserva() {
    this._estado = EstadoReserva.CONFIRMADA;
    return true;
  }

  cancelarReserva() {
    this._estado = EstadoReserva.CANCELADA;
    // TODO: Lógica para liberar cupos en la experiencia y notificar lista de espera
  }

  verificarVencimientoReserva() {
    if (this._estado === EstadoReserva.PENDIENTE && new Date() > this._fechaLimitePago) {
      this._estado = EstadoReserva.VENCIDA;
      // TODO: Lógica para liberar cupos en la experiencia y notificar lista de espera
    }
  }


}

module.exports = Reserva;
