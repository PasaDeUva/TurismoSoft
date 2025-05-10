const Actividad = require('../src/models/actividad');

describe('Clase Actividad', () => {
  let rapel;
  const TYPEOF_NUMBER = 'number';

  beforeEach(() => {
    rapel = new Actividad('Rapel', 'Bajada en soga', 10, 1500);
  });

  test('Debe crear correctamente una actividad con datos básicos', () => {
    expect(rapel.getNombre()).toBe('Rapel');
    expect(rapel.getDescripcion()).toBe('Bajada en soga');
    expect(rapel.getCapacidadMaxima()).toBe(10);
    expect(rapel.getDuracion()).toBe(1500);
  });

  test('No debe permitir modificar el nombre', () => {
    expect(() => rapel.setNombre('Nuevo Nombre')).toThrow(TypeError);
  });
  test('No debe permitir modificar la descripción', () => {
    expect(() => rapel.setDescripcion('Nueva Descripción')).toThrow(TypeError);
  });
  test('No debe permitir modificar la capacidad máxima', () => {
    expect(() => rapel.setCapacidadMaxima(20)).toThrow(TypeError);
  });
  test('No debe permitir modificar la duración', () => {
    expect(() => rapel.setDuracion(120)).toThrow(TypeError);
  });
  test('La duración debe ser un número', () => {
    expect(typeof rapel.getDuracion()).toBe(TYPEOF_NUMBER);
  });
  test('La capacidad maxima debe ser un número', () => {
    expect(typeof rapel.getCapacidadMaxima()).toBe(TYPEOF_NUMBER);
  });
});
