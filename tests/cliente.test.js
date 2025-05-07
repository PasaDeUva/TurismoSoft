const Cliente = require('../src/models/cliente')

describe('Cliente Class', () => {
  let cliente;

  beforeEach(() => {
    cliente = new Cliente('Pepe', 'Argento', '54 12345678910');
  });

  test('Debe crear una instancia Cliente con los campos pasados por constructor', () => {
    expect(cliente.getNombre()).toBe('Pepe');
    expect(cliente.getApellido()).toBe('Argento');
    expect(cliente.getContacto()).toBe('54 12345678910');
  });

  test('Se puede asignar una reserva', () => {
    const mockReserva = { detalles: 'Mock Reserva 1' };

    const idReserva = cliente.agregarReserva(mockReserva);
    expect(idReserva).toBeDefined();
    expect(cliente.getReserva(idReserva)).toEqual(mockReserva);
  });

  test('Se pueden asignar multiples reservas', () => {
    const mockReserva1 = { detalles: 'Mock Reserva 1' };
    const mockReserva2 = { detalles: 'Mock Reserva 2' };

    const idReserva1 = cliente.agregarReserva(mockReserva1);
    const idReserva2 = cliente.agregarReserva(mockReserva2);

    expect(idReserva1).toBeDefined();
    expect(idReserva2).toBeDefined();

    expect(cliente.getReserva(idReserva1)).toEqual(mockReserva1);
    expect(cliente.getReserva(idReserva2)).toEqual(mockReserva2);
  });

  test('No se puede cambiar el nombre', () => {
    expect(() => cliente.setNombre('Pablo')).toThrow(TypeError);
  });

  test('No se puede cambiar el apellido', () => {
    expect(() => cliente.setApellido('Perez')).toThrow(TypeError);
  });

})
