class actividad {
    constructor(nombre, descripcion, capacidadMaxima, duracion, precio) {
      this._nombre = nombre;
      this._descripcion = descripcion;
      this._capacidadMaxima = capacidadMaxima;
      this._duracion = duracion; // Ejemplo: { turno: 'mañana', bloque: 'turno1' }
      this._precio = precio;
      this._disponibilidad = {}; //Ejemplo { lunes: { mañana: { turno1: true, turno2: true, ... } } }
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
    getPrecio() {
      return this._precio;
    }

    configurarDisponibilidad(diasTurnosBloques) {
      for (const dia of diasTurnosBloques) {
        const { diaSemana, turnos } = dia;
  
        if (!this._disponibilidad[diaSemana]) {
          this._disponibilidad[diaSemana] = {};
        }
  
        for (const turno in turnos) {
          if (!this._disponibilidad[diaSemana][turno]) {
            this._disponibilidad[diaSemana][turno] = {};
          }
  
          for (const bloque of turnos[turno]) {
            this._disponibilidad[diaSemana][turno][bloque] = true;
          }
        }
      }
    }
  
    estaDisponible(diaSemana, turno, bloque) {
      return !!(
        this._disponibilidad[diaSemana]?.[turno]?.[bloque]
      );
    }
  }
  
  module.exports = actividad;