class ExperienciaTuristica {
  constructor(nombre, descripcion, cupoMaximo, duracion, precio, minimoCupoDescuento, porcentajeDescuento, fecha) {
    if (this.constructor === ExperienciaTuristica) {
      throw new Error('No puedes instanciar ExperienciaTuristica directamente.');
    }
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._cupoMaximo = cupoMaximo;
    this._duracion = duracion;
    this._minimoCupoDescuento = minimoCupoDescuento;
    this._porcentajeDescuento = porcentajeDescuento;
    this._precio = precio;
    this._fecha = fecha;
    this._reservas = [];
  }

  getNombre() {
    return this._nombre;
  }

  getDescripcion() {
    return this._descripcion;
  }

  getCupo() {
    return this._cupoMaximo;
  }

  getPrecio() {
    return this._precio;
  }

  getMinimoCupoDescuento() {
    return this._minimoCupoDescuento;
  }

  getPorcentajeDescuento() {
    return this._porcentajeDescuento;
  }

  getFecha() {
    return this._fecha;
  }

  setPrecio(precio) {
    if (precio < 0) {
      throw new TypeError('El precio no puede ser negativo.');
    }
    this._precio = precio;
  }

  validarDisponibilidad(cantidadPersonasGrupo, fecha) {
    throw new Error('Método validarDisponibilidad no implementado en la clase base.');
  }

  calcularCostoTotal(cantidadPersonasGrupo) {
    throw new Error('Método calcularCostoTotal no implementado en la clase base.');
  }

  requiereGuiaTuristico() {
    throw new Error('Método requiereGuiaTuristico no implementado en la clase base.');
  }

  getDuracion() {
    return this._duracion;
  }

  addReserva(reserva) {
    if (this._reservas.includes(reserva)) {
      throw new Error('La reserva se encuentra duplicada.');
    }
    this._reservas.push(reserva);
  }

  removeReserva(reserva) {
    const index = this._reservas.findIndex((r) => r === reserva);
    if (index === -1) {
      throw new Error('La reserva no existe.');
    }
    this._reservas.splice(index, 1);
  }

  getReservas() {
    return this._reservas;
  }
}

module.exports = ExperienciaTuristica;
