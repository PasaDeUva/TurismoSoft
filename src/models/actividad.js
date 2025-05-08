class Actividad {
  constructor(nombre, descripcion, capacidadMaxima, duracion) {
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._capacidadMaxima = capacidadMaxima;
    this._duracion = duracion; // Duración en minutos
    this._disponibilidad = {}; // Ejemplo: { lunes: ['08:00', '10:00'] }
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

  getDisponibilidad() {
    return this._disponibilidad;
  }

  configurarDisponibilidad(diasHoras) {
    for (const dia of diasHoras) {
      const { diaSemana, horariosInicio } = dia;

      if (!this._disponibilidad[diaSemana]) {
        this.getDisponibilidad()[diaSemana] = [];
      }

      for (const horario of horariosInicio) {
        this.getDisponibilidad()[diaSemana].push(horario);
      }
    }
  }

  estaDisponible(diaSemana, hora) {
    const horariosInicio = this.getDisponibilidad()[diaSemana];
    if (!horariosInicio) return false;

    for (const inicio of horariosInicio) {
      const [inicioHoras, inicioMinutos] = inicio.split(':').map(Number);
      const [horaHoras, horaMinutos] = hora.split(':').map(Number);

      const inicioEnMinutos = inicioHoras * 60 + inicioMinutos;
      const horaEnMinutos = horaHoras * 60 + horaMinutos;
      const finEnMinutos = inicioEnMinutos + this._duracion;

      if (horaEnMinutos >= inicioEnMinutos && horaEnMinutos < finEnMinutos) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Actividad;
