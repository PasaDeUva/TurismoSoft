class Cliente {
	constructor(nombre, apellido, contacto) {
		this._nombre = nombre;
		this._apellido = apellido;
		this._contacto = contacto;
		this.reservas = {};
	}
	nombre() {
		return this._nombre;
	}

	apellido() {
		return this._apellido;
	}

	contacto() {
		return this._contacto;
	}

	agregarReserva(reserva) {
		const idReserva = crypto.randomUUID(); // Cambiar por ID de objeto cuando se cree la entidad reserva
		this.reservas[idReserva] = reserva;
		return idReserva;
	}

	getReserva(idReserva) {
		return this.reservas[idReserva]
	}
}

module.exports = Cliente;
