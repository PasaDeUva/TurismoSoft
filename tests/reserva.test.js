const Reserva = require('../src/models/reserva.js');
const EstadoReserva = require('../src/util/estado-reserva.js');


describe('Clase Reserva', () => {
  let experienciaMock;
  let clienteMock;
  let reserva;

  beforeEach(() => {
    experienciaMock = {
      id: 'exp-001',
      nombre: 'Tour por la ciudad',
      calcularCostoTotal: jest.fn().mockReturnValue(1000)
    };

    clienteMock = {
      id: 'cli-001',
      nombre: 'Juan Perez',
      email: 'juan@example.com'
    };

    const fechaExperiencia = new Date();
    fechaExperiencia.setDate(fechaExperiencia.getDate() + 14); // 2 semanas despues

    reserva = new Reserva(
      experienciaMock,
      clienteMock,
      fechaExperiencia,
      2
    );
  });

  describe('Constructor', () => {
    test('deberia crear una instancia de Reserva correctamente', () => {
      expect(reserva).toBeInstanceOf(Reserva);
      expect(reserva.getExperiencia()).toBe(experienciaMock);
      expect(reserva.getCliente()).toBe(clienteMock);
      expect(reserva.getFechaReserva()).toBeInstanceOf(Date);
      expect(reserva.getFechaExperiencia()).toBeInstanceOf(Date);
      expect(reserva.getCantPersonas()).toBe(2);
      expect(reserva.getEstado()).toBe(EstadoReserva.PENDIENTE);
      expect(reserva.getMontoTotal()).toBe(1000);
      expect(reserva.getFechaLimitePago()).toBeInstanceOf(Date);
    });

    test('deberia calcular correctamente la fecha limite de pago (7 dias despues)', () => {
      const fechaLimiteEsperada = new Date(reserva.getFechaReserva());
      fechaLimiteEsperada.setDate(fechaLimiteEsperada.getDate() + 7);

      expect(reserva.getFechaLimitePago().getTime()).toBe(fechaLimiteEsperada.getTime());
    });
  });

  describe('confirmarReserva()', () => {
    test('deberia cambiar el estado a CONFIRMADA', () => {
      const resultado = reserva.confirmarReserva();
      expect(resultado).toBe(true);
      expect(reserva.getEstado()).toBe(EstadoReserva.CONFIRMADA);
    });
  });

  describe('cancelarReserva()', () => {
    test('deberia cambiar el estado a CANCELADA', () => {
      reserva.cancelarReserva();
      expect(reserva.getEstado()).toBe(EstadoReserva.CANCELADA);
    });
  });

  describe('verificarVencimientoReserva()', () => {
    test('deberia cambiar a VENCIDA si paso la fecha limite', () => {
      const fechaFutura = new Date(reserva.getFechaLimitePago());
      fechaFutura.setDate(fechaFutura.getDate() + 1);

      jest.useFakeTimers().setSystemTime(fechaFutura);

      reserva.verificarVencimientoReserva();
      expect(reserva.getEstado()).toBe(EstadoReserva.VENCIDA);

      jest.useRealTimers();
    });

    test('no deberia cambiar el estado si no paso la fecha limite', () => {
      const fechaPasada = new Date(reserva.getFechaLimitePago());
      fechaPasada.setDate(fechaPasada.getDate() - 1);

      jest.useFakeTimers().setSystemTime(fechaPasada);

      reserva.verificarVencimientoReserva();
      expect(reserva.getEstado()).toBe(EstadoReserva.PENDIENTE);

      jest.useRealTimers();
    });

    test('no deberia cambiar el estado si ya esta confirmada', () => {
      reserva.confirmarReserva();
      const fechaFutura = new Date(reserva.getFechaLimitePago());
      fechaFutura.setDate(fechaFutura.getDate() + 1);

      jest.useFakeTimers().setSystemTime(fechaFutura);

      reserva.verificarVencimientoReserva();
      expect(reserva.getEstado()).toBe(EstadoReserva.CONFIRMADA);

      jest.useRealTimers();
    });
  });

});
