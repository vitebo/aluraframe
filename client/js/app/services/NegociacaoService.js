class NegociacaoService {
  obterNegociacoes() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ]).then((negociacoes) => {
      return negociacoes.reduce((arrayAchatado, array) => arrayAchatado.concat(array), []);
    }).catch(error => this._mensagem.texto = error);
  }

  obterNegociacoesDaSemana() {
    return new Promise((resolve, rejact) => {
      HttpService
        .get('negociacoes/semana')
        .then(negociacoes => resolve(this._convert(negociacoes)))
        .catch(error => reject(this._messageError('semana')));
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, rejact) => {
      HttpService
        .get('negociacoes/anterior')
        .then(negociacoes => resolve(this._convert(negociacoes)))
        .catch(error => reject(this._messageError('semana anterior')));
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, rejact) => {
      HttpService
        .get('negociacoes/retrasada')
        .then(negociacoes => resolve(this._convert(negociacoes)))
        .catch(error => reject(this._messageError('semana retrasada')));
    });
  }

  cadastrar(negociacao) {
    return this._dao()
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociação cadastrada com sucesso')
      .catch(error => 'Não foi possivel adicionar a negociação');
  }

  lista() {
    return this._dao()
      .then(dao => dao.listaTodos())
      .catch(error => 'Não foi possivel obter as negociações');
  }

  apaga() {
    return this._dao().then(dao => dao.apagarTodos());
  }

  importar(listaAtual) {
    return this.obterNegociacoes()
      .then((negociacoes) => {
        return negociacoes.filter((negociacao) => {
          return !listaAtual.some((negociacaoExistente) => {
            return JSON.stringify(negociacao) === JSON.stringify(negociacaoExistente);
          })
        })
      })
  }

  _dao() {
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection));
  }

  _convert(negociacoes) {
    return negociacoes
      .map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor));
  }

  _messageError(endpoint) {
    return `Não foi possivel obter as negociações da ${endpoint}`;
  }
}
