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
        .then(negociacoes => resolve(this.convert(negociacoes)))
        .catch(error => reject(this.messageError('semana')));
    });
  }

  obterNegociacoesDaSemanaAnterior() {
    return new Promise((resolve, rejact) => {
      HttpService
        .get('negociacoes/anterior')
        .then(negociacoes => resolve(this.convert(negociacoes)))
        .catch(error => reject(this.messageError('semana anterior')));
    });
  }

  obterNegociacoesDaSemanaRetrasada() {
    return new Promise((resolve, rejact) => {
      HttpService
        .get('negociacoes/retrasada')
        .then(negociacoes => resolve(this.convert(negociacoes)))
        .catch(error => reject(this.messageError('semana retrasada')));
    });
  }

  convert(negociacoes) {
    return negociacoes
      .map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor));
  }

  messageError(endpoint) {
    return `Não foi possivel obter as negociações da ${endpoint}`;
  }
}
