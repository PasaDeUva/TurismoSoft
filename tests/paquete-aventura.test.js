const PaqueteAventura = require('../src/models/paquete-aventura');
const Actividad = require('../src/models/actividad');

describe('Clase PaqueteAventura', () => {
  let actividad1, actividad2, paquete;

  beforeEach(() => {
    actividad1 = new Actividad('Rapel', 'Bajada en soga', 10, 90);
    actividad2 = new Actividad('Trekking', 'Caminata guiada', 15, 120);

    actividad1.configurarDisponibilidad([
      { diaSemana: 'lunes', horariosInicio: ['08:00'] },
      { diaSemana: 'martes', horariosInicio: ['10:00'] },
    ]);

    actividad2.configurarDisponibilidad([
      { diaSemana: 'lunes', horariosInicio: ['08:00'] },
      { diaSemana: 'martes', horariosInicio: ['12:00'] },
    ]);

    paquete = new PaqueteAventura('Aventura Extrema', 'Paquete de actividades', 5000, 10, 20, [actividad1, actividad2]);
  });

  test('Debe crear correctamente un paquete de aventura con datos básicos', () => {
    expect(paquete.getNombre()).toBe('Aventura Extrema');
    expect(paquete.getDescripcion()).toBe('Paquete de actividades');
    expect(paquete.getActividades().length).toBe(2);
  });

  test('Debe calcular el cupo máximo como el mínimo de las actividades', () => {
    expect(paquete.getCupoMaximo()).toBe(10); // El cupo más bajo entre las actividades
  });

  test('Debe calcular la duración total como la suma de las actividades', () => {
    expect(paquete.getDuracion()).toBe(210); // 90 + 120
  });

  test('Debe validar disponibilidad correctamente', () => {
    actividad1.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['08:00'] }]);
    actividad2.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['10:00'] }]);

    paquete = new PaqueteAventura('Aventura Extrema', 'Paquete de actividades', 5000, 10, 20, [actividad1, actividad2]);

    expect(paquete.validarDisponibilidad(5, 'lunes', '08:00')).toBe(true); // No hay solapamiento
    actividad1._duracion = 180; // Cambiar duración para forzar solapamiento
    expect(paquete.validarDisponibilidad(5, 'lunes', '08:00')).toBe(false); // Hay solapamiento
  });

  test('Debe calcular el costo total sin descuento', () => {
    const costo = paquete.calcularCostoTotal(5); // Menos del mínimo para descuento
    expect(costo).toBe(5000); // Precio base del paquete
  });

  test('Debe calcular el costo total con descuento', () => {
    const costo = paquete.calcularCostoTotal(10); // Igual o más del mínimo para descuento
    expect(costo).toBe(4000); // Precio base - 20% descuento
  });
  

  test('Debe validar disponibilidad de todas las actividades en un paquete', () => {
    const actividad1 = new Actividad('Rapel', 'Bajada en soga', 10, 1500, 90);
    const actividad2 = new Actividad('Trekking', 'Caminata guiada', 15, 1200, 120);
    const paquete = new PaqueteAventura('Aventura Extrema', 'Paquete de actividades', [actividad1, actividad2], 5000);

    actividad1.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['08:00'] }]);
    actividad2.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['10:00'] }]);

    expect(paquete.validarDisponibilidad(5, 'lunes', '08:00')).toBe(true);
    expect(paquete.validarDisponibilidad(20, 'lunes', '08:00')).toBe(false); // Excede el cupo de actividad1
  });

  test('Debe validar que las actividades no se solapen en duración', () => {
  actividad1.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['08:00'] }]);
  actividad2.configurarDisponibilidad([{ diaSemana: 'lunes', horariosInicio: ['10:00'] }]);

  paquete = new PaqueteAventura('Aventura Extrema', 'Paquete de actividades', 5000, 10, 20, [actividad1, actividad2]);

  expect(paquete.validarDisponibilidad(5, 'lunes', '08:00')).toBe(true); // No hay solapamiento
  actividad1._duracion = 180; // Cambiar duración para forzar solapamiento
  expect(paquete.validarDisponibilidad(5, 'lunes', '08:00')).toBe(false); // Hay solapamiento
});
});
