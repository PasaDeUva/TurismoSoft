const ExperienciaTuristica = require('./experiencia-turistica');

class ExcursionGuiada extends ExperienciaTuristica {
  constructor(nombre, descripcion, cupoMaximo, duracion, precio, minimoCupoDescuento, porcentajeDescuento) {
    super(nombre, descripcion, precio, minimoCupoDescuento, porcentajeDescuento, duracion, cupoMaximo);
    this._guias = [];
  }

  getGuiasTuristicos() {
    return this._guias;
  }

  addGuiaTuristico(guia) {
    if (this.getGuiasTuristicos().includes(guia)) {
      throw new Error('EL guia se encuentra duplicada.');
    }
    this.getGuiasTuristicos().push(guia);
  }

  removeGuiaTuristico(guia) {
    const index = this.getGuiasTuristicos().findIndex((g) => g === guia);
    if (index === -1) {
      throw new Error('El guia no existe.');
    }
    this.getGuiasTuristicos().splice(index, 1);
  }

  validarDisponibilidad(cantidadPersonasGrupo, fecha, hora) {
    if (!this._algunGuiaDisponible()) {
      return false;
    } else if (cantidadPersonasGrupo > this.getCupoMaximo()) {
      return false;
    } else if (this._lasReservasSuperanCupoMaximo(cantidadPersonasGrupo, fecha, hora)) {
      return false;
    }
    return true;
  }

  getReservasDiaHora(fecha, hora) {
    return this.getReservas().filter((reserva) => reserva.getFecha() === fecha && reserva.getHora() === hora);
  }

  _algunGuiaDisponible(fecha, hora) {
    return this.getGuiasTuristicos().some((guia) => guia.estaDisponible(fecha, hora));
  }

  _lasReservasSuperanCupoMaximo(cantidadPersonasGrupo, fecha, hora) {
    let reservasDiaHora = this.getReservasDiaHora(fecha, hora);
    let totalPersonasReservadas = reservasDiaHora.reduce((total, reserva) => total + reserva.getCantidadPersonas(), 0);
    return totalPersonasReservadas + cantidadPersonasGrupo > this.getCupoMaximo();
  }

  calcularCostoTotal(cantidadPersonasGrupo) {
    let costoTotal = this._precio * cantidadPersonasGrupo;
    if (cantidadPersonasGrupo >= this._minimoCupoDescuento) {
      costoTotal -= (costoTotal * this._porcentajeDescuento) / 100;
    }
    return costoTotal;
  }

  requiereGuiaTuristico() {
    return true; // Por defecto, las excursiones guiadas requieren un guía turístico
  }
}

module.exports = ExcursionGuiada;
