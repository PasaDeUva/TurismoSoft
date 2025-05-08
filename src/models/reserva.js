const EstadoReserva = require('../util/estado-reserva.js');

class Reserva {

  static EstadoReserva = {
    PENDIENTE: 'pendiente',
    CONFIRMADA: 'confirmada',
    CANCELADA: 'cancelada',
    VENCIDA: 'vencida'
  }

  constructor(experiencia, cliente, fechaExperiencia, cantPersonas) {
    this.id = crypto.randomUUID();
    this.experiencia = experiencia;
    this.cliente = cliente;
    this.fechaReserva = new Date(); // Fecha actual
    this.fechaExperiencia = fechaExperiencia;
    this.cantPersonas = cantPersonas;
    this.estado = EstadoReserva.PENDIENTE;
    this.montoTotal = this.calcularMontoTotal();
    this.fechaLimitePago = this.calcularFechaLimitePago();
  }

  calcularMontoTotal() {
    let precioBase = this.experiencia.calcularCostoTotal(this.cantPersonas);

    return precioBase;
  }

  calcularFechaLimitePago() {
    const fechaLimite = new Date(this.fechaReserva);
    fechaLimite.setDate(fechaLimite.getDate() + 7);
    return fechaLimite;
  }

  confirmarReserva() {
    this.estado = EstadoReserva.CONFIRMADA;
    return true;
  }

  cancelarReserva() {
    this.estado = EstadoReserva.CANCELADA;
    // TODO: Lógica para liberar cupos en la experiencia y notificar lista de espera
  }

  verificarVencimientoReserva() {
    if (this.estado === EstadoReserva.PENDIENTE && new Date() > this.fechaLimitePago) {
      this.estado = EstadoReserva.VENCIDA;
      // TODO: Lógica para liberar cupos en la experiencia y notificar lista de espera
    }
  }


}

module.exports = Reserva;
