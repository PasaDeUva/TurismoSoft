const Actividad = require('../src/models/actividad');

describe('Clase Actividad', () => {
  let rapel, trekking, escalada;

  beforeEach(() => {
    //rapel disponible Lunes miercoles y viernes en los turnos de mañana y tarde
    rapel = new Actividad('Rapel', 'Bajada en soga', 10, 90);

    rapel.configurarDisponibilidad([
      {
        diaSemana: 'lunes',
        horariosInicio: ['08:00', '10:00', '14:00'],
      },
      {
        diaSemana: 'miercoles',
        horariosInicio: ['08:00', '10:00', '14:00'],
      },
      {
        diaSemana: 'viernes',
        horariosInicio: ['08:00', '10:00', '14:00'],
      },
    ]);

    //trekking disponible martes y jueves en los turnos de mañana y tarde
    trekking = new Actividad('Trekking', 'Caminata guiada', 15, 120);

    trekking.configurarDisponibilidad([
      {
        diaSemana: 'martes',
        horariosInicio: ['08:00', '11:00', '14:00'],
      },
      {
        diaSemana: 'jueves',
        horariosInicio: ['08:00', '11:00', '14:00'],
      },
    ]);

    //escalada disponible viernes
    escalada = new Actividad('Escalada', 'Ascenso por paredes naturales ', 8, 60);

    escalada.configurarDisponibilidad([
      {
        diaSemana: 'viernes',
        horariosInicio: ['10:00', '12:00'],
      },
    ]);
  });

  test('Debe crear correctamente una actividad con datos básicos', () => {
    expect(rapel.getNombre()).toBe('Rapel');
    expect(rapel.getDescripcion()).toBe('Bajada en soga');
    expect(rapel.getCapacidadMaxima()).toBe(10);
    expect(rapel.getDuracion()).toBe(90);
  });

  test('Rapel debe estar disponible lunes a las 08:00', () => {
    expect(rapel.estaDisponible('lunes', '08:00')).toBe(true);
    expect(rapel.estaDisponible('miercoles', '10:00')).toBe(true);
    expect(rapel.estaDisponible('viernes', '14:00')).toBe(true);
  });

  test('Debe rechazar disponibilidad inexistente', () => {
    expect(rapel.estaDisponible('sabado', '08:00')).toBe(false);
  });

  test('Trekking debe estar disponible martes a las 08:00', () => {
    expect(trekking.estaDisponible('martes', '08:00')).toBe(true);
  });

  test('Escalada debe estar disponible viernes a las 12:00', () => {
    expect(escalada.estaDisponible('viernes', '12:00')).toBe(true);
  });

  test('Rapel no debe estar disponible martes a las 08:00', () => {
    expect(rapel.estaDisponible('martes', '08:00')).toBe(false);
  });

  test('Trekking no debe estar disponible sábado a las 10:00', () => {
    expect(trekking.estaDisponible('sabado', '10:00')).toBe(false);
  });

  test('Escalada no debe estar disponible viernes a las 16:00', () => {
    expect(escalada.estaDisponible('viernes', '16:00')).toBe(false);
  });
});
