const $ = document.querySelector.bind(document);

class NegociacaoController {
  constructor() {
    this._$inputData = $('#data');
    this._$inputQuantidade = $('#quantidade');
    this._$inputValor = $('#valor');
    this._listaNegociacoes = this._buildListaNegociacao();
    this._mensagem = this._buildMenssagem();
  }

  _buildListaNegociacao() {
    const model = new ListaNegociacoes();
    const view = new NegociacoesView($('#NegociacoesView'));
    const props = ['adiciona', 'esvazia'];
    return new Bind(model, view, props);
  }

  _buildMenssagem() {
    const model = new Mensagem();
    const view = new MensagemView($('#MensagemView'));
    const props = ['texto'];
    return new Bind(model, view, props);
  }

  adiciona(event) {
    event.preventDefault();
    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso';
    this._limpaFormulario();
  }

  apaga() {
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }

  importaNegociacoes() {
    const service = new NegociacaoService();
    service.obterNegociacoes()
      .then((negociacoes) => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        return this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(error => this._mensagem.texto = error);
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
