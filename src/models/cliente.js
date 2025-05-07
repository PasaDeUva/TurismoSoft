class Cliente {
	constructor(nombre, apellido, contacto) {
		this._nombre = nombre;
		this._apellido = apellido;
		this._contacto = contacto;
		this._reservas = {};
	}
	getNombre() {
		return this._nombre;
	}

	getApellido() {
		return this._apellido;
	}

	getContacto() {
		return this._contacto;
	}

	agregarReserva(reserva) {
		const idReserva = crypto.randomUUID(); // Cambiar por ID de objeto cuando se cree la entidad reserva
		this._reservas[idReserva] = reserva;
		return idReserva;
	}

	getReserva(idReserva) {
		return this._reservas[idReserva]
	}
}

module.exports = Cliente;
