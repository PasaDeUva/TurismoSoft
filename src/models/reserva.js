const EstadoReserva = require('../util/estado-reserva.js');

class Reserva {
  constructor(experiencia, cliente, cantPersonas) {
    this._id = crypto.randomUUID();
    this._experiencia = experiencia;
    this._cliente = cliente;
    this._fechaReserva = new Date();
    this._cantPersonas = cantPersonas;
    this._estado = EstadoReserva.PENDIENTE;
    this._montoTotal = this._experiencia.calcularCostoTotal(this._cantPersonas);
    this._fechaLimitePago = this.calcularFechaLimitePago();
  }

  getId() {
    return this._id;
  }

  getExperiencia() {
    return this._experiencia;
  }

  getCliente() {
    return this._cliente;
  }

  getFechaReserva() {
    return this._fechaReserva;
  }

  getCantPersonas() {
    return this._cantPersonas;
  }

  getEstado() {
    return this._estado;
  }

  getMontoTotal() {
    return this._montoTotal;
  }

  getFechaLimitePago() {
    return this._fechaLimitePago;
  }

  calcularFechaLimitePago() {
    /* La fecha limite de pago es 7 dias a partir de la fecha de reserva
     * o hasta 1 dia antes de la fecha de la experiencia, lo que ocurra primero.
     */
    const fechaReserva = new Date(this.getFechaReserva());
    const fechaExperiencia = new Date(this.getExperiencia().getFecha());

    let fechaLimitePago = new Date(fechaReserva);
    fechaLimitePago.setDate(fechaReserva.getDate() + 7);

    let fechaExperienciaLimite = new Date(fechaExperiencia);
    fechaExperienciaLimite.setDate(fechaExperiencia.getDate() - 1);

    return fechaLimitePago <= fechaExperienciaLimite ? fechaLimitePago : fechaExperienciaLimite;
  }

  confirmarReserva() {
    this._estado = EstadoReserva.CONFIRMADA;
    return true;
  }

  cancelarReserva() {
    this._estado = EstadoReserva.CANCELADA;
    this._notificarBajaReserva();
  }

  verificarVencimientoReserva() {
    if (this.getEstado() === EstadoReserva.PENDIENTE && new Date() > this.getFechaLimitePago()) {
      this._estado = EstadoReserva.VENCIDA;
      this._notificarBajaReserva();
      return true;
    }
    return false;
  }

  _notificarBajaReserva() {
    // todo: this.getExperiencia().manejarLibracionCupo(this.getCantPersonas());
  }
}

module.exports = Reserva;
