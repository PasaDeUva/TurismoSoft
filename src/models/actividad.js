class Actividad {
  constructor(nombre, descripcion, capacidadMaxima, duracion) {
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._capacidadMaxima = capacidadMaxima;
    this._duracion = duracion; // Duración en minutos
  }

  getNombre() {
    return this._nombre;
  }

  getDescripcion() {
    return this._descripcion;
  }

  getCapacidadMaxima() {
    return this._capacidadMaxima;
  }

  getDuracion() {
    return this._duracion;
  }
}

module.exports = Actividad;
