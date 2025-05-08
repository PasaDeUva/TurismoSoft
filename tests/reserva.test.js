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
      expect(reserva._experiencia).toBe(experienciaMock);
      expect(reserva._cliente).toBe(clienteMock);
      expect(reserva._fechaReserva).toBeInstanceOf(Date);
      expect(reserva._fechaExperiencia).toBeInstanceOf(Date);
      expect(reserva._cantPersonas).toBe(2);
      expect(reserva._estado).toBe(EstadoReserva.PENDIENTE);
      expect(reserva._montoTotal).toBe(1000);
      expect(reserva._fechaLimitePago).toBeInstanceOf(Date);
    });

    test('deberia calcular correctamente la fecha limite de pago (7 dias despues)', () => {
      const fechaLimiteEsperada = new Date(reserva._fechaReserva);
      fechaLimiteEsperada.setDate(fechaLimiteEsperada.getDate() + 7);

      expect(reserva._fechaLimitePago.getTime()).toBe(fechaLimiteEsperada.getTime());
    });
  });

  describe('calcularMontoTotal()', () => {
    test('deberia llamar al metodo calcularCostoTotal de la experiencia', () => {
      reserva.calcularMontoTotal();
      expect(experienciaMock.calcularCostoTotal).toHaveBeenCalledWith(2);
    });

    test('deberia devolver el monto calculado por la experiencia', () => {
      experienciaMock.calcularCostoTotal.mockReturnValue(1500);
      const nuevaReserva = new Reserva(experienciaMock, clienteMock, new Date(), 3);
      expect(nuevaReserva._montoTotal).toBe(1500);
    });
  });

  describe('confirmarReserva()', () => {
    test('deberia cambiar el estado a CONFIRMADA', () => {
      const resultado = reserva.confirmarReserva();
      expect(resultado).toBe(true);
      expect(reserva._estado).toBe(EstadoReserva.CONFIRMADA);
    });
  });

  describe('cancelarReserva()', () => {
    test('deberia cambiar el estado a CANCELADA', () => {
      reserva.cancelarReserva();
      expect(reserva._estado).toBe(EstadoReserva.CANCELADA);
    });
  });

  describe('verificarVencimientoReserva()', () => {
    test('deberia cambiar a VENCIDA si paso la fecha limite', () => {
      const fechaFutura = new Date(reserva._fechaLimitePago);
      fechaFutura.setDate(fechaFutura.getDate() + 1);

      jest.useFakeTimers().setSystemTime(fechaFutura);

      reserva.verificarVencimientoReserva();
      expect(reserva._estado).toBe(EstadoReserva.VENCIDA);

      jest.useRealTimers();
    });

    test('no deberia cambiar el estado si no paso la fecha limite', () => {
      const fechaPasada = new Date(reserva._fechaLimitePago);
      fechaPasada.setDate(fechaPasada.getDate() - 1);

      jest.useFakeTimers().setSystemTime(fechaPasada);

      reserva.verificarVencimientoReserva();
      expect(reserva._estado).toBe(EstadoReserva.PENDIENTE);

      jest.useRealTimers();
    });

    test('no deberia cambiar el estado si ya esta confirmada', () => {
      reserva._estado = EstadoReserva.CONFIRMADA;
      const fechaFutura = new Date(reserva._fechaLimitePago);
      fechaFutura.setDate(fechaFutura.getDate() + 1);

      jest.useFakeTimers().setSystemTime(fechaFutura);

      reserva.verificarVencimientoReserva();
      expect(reserva._estado).toBe(EstadoReserva.CONFIRMADA);

      jest.useRealTimers();
    });
  });

  describe('Estados Reserva', () => {
    test('deberia tener los estados correctos definidos', () => {
      expect(Reserva.EstadoReserva).toEqual({
        PENDIENTE: 'pendiente',
        CONFIRMADA: 'confirmada',
        CANCELADA: 'cancelada',
        VENCIDA: 'vencida'
      });
    });
  });
});
