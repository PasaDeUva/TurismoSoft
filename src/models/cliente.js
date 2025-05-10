class Cliente {
  constructor(nombre, apellido, contacto) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._contacto = contacto;
    this._reservas = [];
  }

  getNombre() {
    return this._nombre;
  }

  getApellido() {
    return this._apellido;
  }

  getContacto() {
    return this._contacto;
  }

  getReservas() {
    return this._reservas;
  }

  addReserva(reserva) {
    if (this.getReservas().includes(reserva)) {
      throw new Error('La reserva ya existe.');
    }
    this.getReservas().push(reserva);
  }

  removeReserva(reserva) {
    const index = this.getReservas().indexOf(reserva);
    if (index === -1) {
      throw new Error('La reserva no existe.');
    }
    this.getReservas().splice(index, 1);
  }
}

module.exports = Cliente;
