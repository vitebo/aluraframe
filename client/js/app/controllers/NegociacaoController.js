class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document);
    this._$inputData = $('#data');
    this._$inputQuantidade = $('#quantidade');
    this._$inputValor = $('#valor');
    this._listaNegociacoes = new ListaNegociacoes();
    this._negociacoesView = new NegociacoesView($('#NegociacoesView'));
    this._negociacoesView.update(this._listaNegociacoes);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    console.log(this._listaNegociacoes.negociacoes);
    this._negociacoesView.update(this._listaNegociacoes);
    this._limpaFormulario();
  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textoParaData(this._$inputData.value),
      this._$inputQuantidade.value,
      this._$inputValor.value
    );
  }

  _limpaFormulario() {
    this._$inputData.value = '';
    this._$inputQuantidade.value = 1;
    this._$inputValor.value = 0.0;
    this._$inputData.focus();
  }
}
