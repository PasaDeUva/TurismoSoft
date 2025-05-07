class GuiaTuristico {
  constructor(nombre, apellido, idioma) {
    this._nombre = nombre;
    this._apellido = apellido;
    this._idioma = idioma;
  }

  getNombre() {
    return this._nombre;
  }

  getApellido() {
    return this._apellido;
  }

  getIdioma() {
    return this._idioma;
  }

  setIdioma(idioma) {
    this._idioma = idioma;
  }
}

module.exports = GuiaTuristico;
