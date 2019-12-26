export class View {
  constructor($elemento) {
    this._$elemento = $elemento;
  }

  update(model) {
    this._$elemento.innerHTML = this.template(model);
  }

  template() {
    throw new Error('O método template deve ser implementado');
  }

  get $elemento() {
    return this._$elemento;
  }

  addEventListener(event, callback) {
    this.$elemento.addEventListener(event, callback);
    return this;
  }
}
