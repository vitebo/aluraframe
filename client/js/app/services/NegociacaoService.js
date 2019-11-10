class NegociacaoService {
  obterNegociacoesDaSemana(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'negociacoes/semana');
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText)
          .map(({ data, quantidade, valor }) => new Negociacao(new Date(data), quantidade, valor));
        return callback(null, response);
      }
      console.error(xhr.responseText);
      callback('Não foi possivel obter as negociações', null);
    };
    xhr.send();
  }
}
