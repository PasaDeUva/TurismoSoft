class GuiaTuristico {
  constructor(nombre, apellido, idioma) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._idioma = idioma;
  }

  getNombre() {
    return this.nombre;
  }

  getApellido() {
    return this.apellido;
  }

  getIdioma() {
    return this.idioma;
  }

  setIdioma(idioma) {
    this.idioma = idioma;
  }
}

module.exports = GuiaTuristico;
