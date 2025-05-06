const GuiaTuristico = require('../src/models/guia-turistico');

describe('GuiaTuristico Class', () => {
  let guia;

  beforeEach(() => {
    guia = new GuiaTuristico('Juan', 'Perez', 'Español');
  });

  test('Debe crear una instancia de GuiaTuristico con las propiedades correctas', () => {
    expect(guia.getNombre()).toBe('Juan');
    expect(guia.getApellido()).toBe('Perez');
    expect(guia.getIdioma()).toBe('Español');
  });

  test('Se puede cambiar el idioma', () => {
    guia.setIdioma('Inglés');
    expect(guia.getIdioma()).toBe('Inglés');
  });

  test('No se puede cambiar el Nombre', () => {
    expect(() => guia.setNombre('Ana')).toThrow(TypeError);
  });

  test('No se puede cambiar el Apellido', () => {
    expect(() => guia.setApellido('Arma')).toThrow(TypeError);
  });
});
