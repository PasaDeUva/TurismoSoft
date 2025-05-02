const Actividad = require('../src/models/actividad');

describe('Clase Actividad', () => {
  let rapel, trekking, escalada;

  beforeEach(() => {
    //rapel disponible Lunes miercoles y viernes en los turnos de mañana y tarde
    rapel = new Actividad('Rapel', 'Bajada en soga', 10, { turno: 'mañana', bloque: 'turno1' }, 1500);

    rapel.configurarDisponibilidad([
      {
        diaSemana: 'lunes',
        turnos: {
          mañana: ['turno1', 'turno2', 'turno3'],
          tarde: ['turno1', 'turno2', 'turno3']
        }
      },
      {
        diaSemana: 'miercoles',
        turnos: {
          mañana: ['turno1', 'turno2', 'turno3'],
          tarde: ['turno1', 'turno2', 'turno3']
        }
      },
      {
        diaSemana: 'viernes',
        turnos: {
          mañana: ['turno1', 'turno2', 'turno3'],
          tarde: ['turno1', 'turno2', 'turno3']
        }
      }
    ]);

  //trekking disponible martes y jueves a la mañana
    trekking = new Actividad('Trekking', 'Caminata guiada', 10, { turno: 'mañana', bloque: 'turno3' }, 1200);

    trekking.configurarDisponibilidad([
      {
        diaSemana: 'martes',
        turnos: {
          mañana: ['turno1', 'turno2', 'turno3']
        }
      },
      {
        diaSemana: 'jueves',
        turnos: {
          mañana: ['turno1', 'turno2', 'turno3']
        }
      }
    ]);

    //escalada disponible viernes a la noche
    escalada  = new Actividad('Escalada', 'Ascenso por paredes naturales ', 10, { turno: 'noche', bloque: 'turno2' }, 1800);

    escalada.configurarDisponibilidad([
      {
        diaSemana: 'viernes',
        turnos: {
            noche: ['turno2']
        }
      }
    ]);
  });

  test('Debe crear correctamente una actividad con datos básicos', () => {
    expect(rapel.getNombre()).toBe('Rapel');
    expect(rapel.getDescripcion()).toBe('Bajada en soga');
    expect(rapel.getCapacidadMaxima()).toBe(10);
    expect(rapel.getPrecio()).toBe(1500);
  });

  test('Debe establecer disponibilidad en los días y bloques correctos', () => {
    expect(rapel.estaDisponible('lunes', 'mañana', 'turno2')).toBe(true);
    expect(rapel.estaDisponible('miercoles', 'tarde', 'turno3')).toBe(true);
    expect(rapel.estaDisponible('viernes', 'noche', 'turno1')).toBe(false); // no se configuró
  });

  test('Debe rechazar disponibilidad inexistente', () => {
    expect(rapel.estaDisponible('sabado', 'mañana', 'turno1')).toBe(false);
  });

  test('Trekking debe estar disponible martes mañana turno3', () => {
    expect(trekking.estaDisponible('martes', 'mañana', 'turno3')).toBe(true);
  });

  test('Escalada debe estar disponible viernes noche turno2', () => {
    expect(escalada.estaDisponible('viernes', 'noche', 'turno2')).toBe(true);
  });

  test('Rapel no debe estar disponible martes mañana turno1', () => {
    expect(rapel.estaDisponible('martes', 'mañana', 'turno1')).toBe(false);
  });

  test('Trekking no debe estar disponible sábado mañana turno2', () => {
    expect(trekking.estaDisponible('sabado', 'mañana', 'turno2')).toBe(false);
  });

  test('Escalada no debe estar disponible viernes noche turno1 (solo turno2)', () => {
    expect(escalada.estaDisponible('viernes', 'noche', 'turno1')).toBe(false);
  });
});
