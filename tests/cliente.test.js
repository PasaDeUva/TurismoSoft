const Cliente = require('../src/models/cliente');

describe('Cliente Class', () => {
  let cliente;

  beforeEach(() => {
    cliente = new Cliente('Pepe', 'Argento', '5493415687495');
  });

  test('Debe crear una instancia Cliente con los campos pasados por constructor', () => {
    expect(cliente.getNombre()).toBe('Pepe');
    expect(cliente.getApellido()).toBe('Argento');
    expect(cliente.getContacto()).toBe('5493415687495');
  });

  test('Se puede asignar una reserva', () => {
    const mockReserva = { id: 1, detalles: 'Mock Reserva' };
    cliente.addReserva(mockReserva);
    expect(cliente.getReservas().length).toBe(1);
    expect(cliente.getReservas().includes(mockReserva)).toEqual(true);
  });

  test('No se puede asignar la misma reserva dos veces', () => {
    const mockReserva = { id: 2, detalles: 'Mock Reserva' };
    cliente.addReserva(mockReserva);
    expect(() => cliente.addReserva(mockReserva)).toThrow(Error);
  });

  test('Se pueden asignar multiples reservas', () => {
    const mockReserva1 = { id: 1, detalles: 'Mock Reserva' };
    const mockReserva2 = { id: 2, detalles: 'Mock Reserva' };

    cliente.addReserva(mockReserva1);
    cliente.addReserva(mockReserva2);

    expect(cliente.getReservas().length).toBe(2);
    expect(cliente.getReservas().includes(mockReserva1)).toEqual(true);
    expect(cliente.getReservas().includes(mockReserva2)).toEqual(true);
  });

  test('No se puede cambiar el nombre', () => {
    expect(() => cliente.setNombre('Pablo')).toThrow(TypeError);
  });

  test('No se puede cambiar el apellido', () => {
    expect(() => cliente.setApellido('Perez')).toThrow(TypeError);
  });

  test('No se puede cambiar el contacto', () => {
    expect(() => cliente.setContacto('5493415687495')).toThrow(TypeError);
  });

  test('Se puede eliminar una reserva', () => {
    const mockReserva = { id: 1, detalles: 'Mock Reserva' };
    cliente.getReservas().push(mockReserva); // Simulando que la reserva ya fue agregada para desacoplar el test de addReserva
    cliente.removeReserva(mockReserva);
    expect(cliente.getReservas().length).toBe(0);
    expect(cliente.getReservas().includes(mockReserva)).toEqual(false);
  });

  test('No se puede eliminar una reserva que no existe', () => {
    const mockReserva = { id: 1, detalles: 'Mock Reserva' };
    expect(() => cliente.removeReserva(mockReserva)).toThrow(Error);
  });
});
