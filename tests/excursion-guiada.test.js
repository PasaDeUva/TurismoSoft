const ExcursionGuiada = require('../src/models/excursion-guiada');
const GuiaTuristico = require('../src/models/guia-turistico');

describe('Clase ExcursionGuiada', () => {
  let excursion;

  beforeEach(() => {
    excursion = new ExcursionGuiada('Excursión en la montaña', 'Una caminata guiada por senderos naturales', 20, 120, 5000, 10, 20);

    // Asignar un guia
    const guia = new GuiaTuristico('Juan', 'Pérez', 'Español');
    excursion.addGuiaTuristico(guia);
  });

  test('Debe crear correctamente una excursión guiada con datos básicos', () => {
    expect(excursion.getNombre()).toBe('Excursión en la montaña');
    expect(excursion.getDescripcion()).toBe('Una caminata guiada por senderos naturales');
    expect(excursion.getCupoMaximo()).toBe(20);
    expect(excursion.getDuracion()).toBe(120);
    expect(excursion.getPrecio()).toBe(5000);
    expect(excursion.getMinimoCupoDescuento()).toBe(10);
    expect(excursion.getPorcentajeDescuento()).toBe(20);
  });

  test('Debe validar disponibilidad correctamente', () => {
    expect(excursion.validarDisponibilidad(5, '2025-05-07')).toBe(true); // Dentro del cupo
    expect(excursion.validarDisponibilidad(25, '2025-05-07')).toBe(false); // Excede el cupo
  });

  test('Debe calcular el costo total sin descuento', () => {
    const costo = excursion.calcularCostoTotal(5); // Menos del mínimo para descuento
    expect(costo).toBe(25000); // 5000 * 5
  });

  test('Debe calcular el costo total con descuento', () => {
    const costo = excursion.calcularCostoTotal(10); // Igual o más del mínimo para descuento
    expect(costo).toBe(40000); // 5000 * 10 - 20% descuento
  });

  test('Debe requerir un guía turístico', () => {
    expect(excursion.requiereGuiaTuristico()).toBe(true);
  });

  test('No debe permitir reservar una excursión guiada sin un guía', () => {
    excursion._guia = null;
    expect(excursion.validarDisponibilidad(5, '2025-05-07')).toBe(false); // Sin guía asignado
    const guia = new GuiaTuristico('Juan', 'Pérez', 'Español');
    excursion.asignarGuia(guia);
    expect(excursion.validarDisponibilidad(5, '2025-05-07')).toBe(true); // Con guía asignado
  });
});
