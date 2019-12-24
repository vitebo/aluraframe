class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._getStore().add(negociacao);
      request.onsuccess = e => resolve();
      request.onerror = (e) => {
        console.error(e.target.error);
        reject('Não foi possivel adicionar a negociação');
      }
    });
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = [];
      const cursor = this._getStore().openCursor();
      cursor.onsuccess = (e) => {
        const atual = e.target.result;
        if (atual) {
          const { _data, _quantidade, _valor } = atual.value;
          negociacoes.push(new Negociacao(_data, _quantidade, _valor));
          atual.continue();
        } else {
          resolve(negociacoes);
        }
      };
      cursor.onerror = (e) => {
        console.error(e.target.error);
        reject('Não foi possível listar as negociações');
      };
    });
  }

  apagarTodos() {
    return new Promise((resolve, reject) => {
      const request = this._getStore().clear();
      request.onsuccess = e => resolve('Negociações removidas com sucesso');
      request.onerror = (e) => {
        console.error(e.target.error);
        reject('Não foi possivel remover as negociações');
      }
    });
  }

  _getStore() {
    return this._connection
      .transaction([this._store], 'readwrite')
      .objectStore(this._store);
  }
}
