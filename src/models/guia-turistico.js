class GuiaTuristico {
  constructor(nombre, apellido, idioma) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._idioma = idioma;
    this._reservas = [];
  }

  getNombre() {
    return this._nombre;
  }

  getApellido() {
    return this._apellido;
  }

  getIdioma() {
    return this._idioma;
  }

  setIdioma(idioma) {
    this._idioma = idioma;
  }

  addReserva(reserva) {
    if (this.getReservas().includes(reserva)) {
      throw new Error('La reserva se encuentra duplicada.');
    }
    this.getReservas().push(reserva);
  }

  removeReserva(reserva) {
    const index = this.getReservas().findIndex((r) => r === reserva);
    if (index === -1) {
      throw new Error('La reserva no existe.');
    }
    this.getReservas().splice(index, 1);
  }

  getReservasExcursionGuiada(excursionGuiada) {
    return this.getReservas().filter((reserva) => reserva.getExcursionGuiada() === excursionGuiada);
  }

  getReservas() {
    return this._reservas;
  }

  estaDisponible(fecha, hora) {
    return !this.getReservas().some((reserva) => reserva.getFecha() === fecha && reserva.getHora() === hora);
  }
}

module.exports = GuiaTuristico;
