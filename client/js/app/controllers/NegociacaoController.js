const $ = document.querySelector.bind(document);

class NegociacaoController {
  constructor() {
    this._$inputData = $('#data');
    this._$inputQuantidade = $('#quantidade');
    this._$inputValor = $('#valor');
    this._listaNegociacoes = this._buildListaNegociacao();
    this._mensagem = this._buildMenssagem();
    this._ordemAtual = '';
    this._setupDb();
  }

  _buildListaNegociacao() {
    const model = new ListaNegociacoes();
    const view = new NegociacoesView($('#NegociacoesView'));
    const props = ['adiciona', 'esvazia', 'ordena', 'inverteOrdem'];
    return new Bind(model, view, props);
  }

  _buildMenssagem() {
    const model = new Mensagem();
    const view = new MensagemView($('#MensagemView'));
    const props = ['texto'];
    return new Bind(model, view, props);
  }

  _setupDb() {
    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .then((negociacoes) => negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao)))
      .catch(error => this._mensagem.texto = error);
  }

  adiciona(event) {
    event.preventDefault();
    ConnectionFactory
      .getConnection()
      .then((connection) => {
        const negociacao = this._criaNegociacao();
        new NegociacaoDao(connection)
          .adiciona(negociacao)
          .then(() => {
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            this._limpaFormulario();
          })
      })
      .catch(error => this._mensagem.texto = erro);
  }

  apaga() {
    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagarTodos())
      .then((msg) => {
        this._listaNegociacoes.esvazia();
        this._mensagem.texto = msg;
      })
      .catch(msg => this._mensagem.texto = msg);
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

  ordena(coluna) {
    if (this._ordemAtual === coluna) {
      return this._listaNegociacoes.inverteOrdem();
    }
    this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
    this._ordemAtual = coluna;
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
