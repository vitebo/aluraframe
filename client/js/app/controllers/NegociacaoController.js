class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._$inputData = $('#data');
    this._$inputQuantidade = $('#quantidade');
    this._$inputValor = $('#valor');
  }

  adiciona(event) {
    event.preventDefault();

    const data = new Date(
      ...this._$inputData.value
      .split('-')
      .map((item, indice) => item - indice % 2)
    );

    const negociacao = new Negociacao(
      data,
      this._$inputQuantidade.value,
      this._$inputValor.value
    );

    console.log(this._$inputData.value);
    console.log(data);
  }
}
