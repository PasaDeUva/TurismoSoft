const ExperienciaTuristica = require('./experiencia-turistica');

class PaqueteAventura extends ExperienciaTuristica {
  constructor(nombre, descripcion, precio, minimoCupoDescuento, porcentajeDescuento, actividades = []) {
    super(nombre, descripcion, precio, minimoCupoDescuento, porcentajeDescuento);
    this._actividades = actividades;
  }

  getActividades() {
    return this._actividades;
  }

  getCupoMaximo() {
    return Math.min(...this.getActividades().map((a) => a.getCapacidadMaxima()));
    // El cupo maximo del Paquete de Aventura viene dado por el menor de las actividades que lo componen
  }

  getDuracion() {
    return this.getActividades().reduce((total, actividad) => total + actividad.getDuracion(), 0);
    // La duracion es la suma de la duracion de todas las actividades
  }

  validarDisponibilidad(cantidadPersonasGrupo, diaSemana, hora) {
    let horaEnMinutos = this.convertirHoraAMinutos(hora);

    return this._actividades.every((actividad, index) => {
      // Verificar si la actividad está disponible en el día y hora especificados
      if (!actividad.estaDisponible(diaSemana, hora) || cantidadPersonasGrupo > actividad.getCapacidadMaxima()) {
        return false; // La actividad no está disponible o excede el cupo
      }

      // Validar que no se solape con la siguiente actividad en el mismo día
      if (index < this._actividades.length - 1) {
        const siguienteActividad = this._actividades[index + 1];
        const siguienteHorariosInicio = siguienteActividad.getDisponibilidad()[diaSemana];

        if (siguienteHorariosInicio) {
          const [siguienteInicioHoras, siguienteInicioMinutos] = siguienteHorariosInicio[0].split(':').map(Number);
          const siguienteInicioEnMinutos = siguienteInicioHoras * 60 + siguienteInicioMinutos;

          const finEnMinutos = horaEnMinutos + actividad.getDuracion();
          if (finEnMinutos > siguienteInicioEnMinutos) {
            return false; // Hay solapamiento
          }
        }
      }

      return true; // No hay solapamiento
    });
  }

  convertirHoraAMinutos(hora) {
    const [horas, minutos] = hora.split(':').map(Number);
    return horas * 60 + minutos;
  }
  

  calcularCostoTotal(cantidadPersonasGrupo) {
    let costoTotal = this._precio; // El precio base del paquete es el definido en el constructor

    // Aplicar descuento si se cumple el mínimo de personas requerido
    if (cantidadPersonasGrupo >= this.getMinimoCupoDescuento()) {
      costoTotal -= (costoTotal * this.getPorcentajeDescuento()) / 100;
    }

    return costoTotal;
  }

  requiereGuiaTuristico() {
    return false; // Asumimos que las actividades del Paquete de Aventuras no requiere guía turístico
  }
}

module.exports = PaqueteAventura;
