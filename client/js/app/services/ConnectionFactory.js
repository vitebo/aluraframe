const ConnectionFactory = (function() {
  const stores = ['negociacoes'];
  const version = 1;
  const dbName = 'aluraframe';

  let connection = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error('Não é possivel criar instâncias de ConnectionFactory');
    }

    static getConnection() {
      return new Promise((resolve, reject) => {
        const openRequest = window.indexedDB.open(dbName, version);

        openRequest.onupgradeneeded = (e) => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = (e) => {
          if (!connection) {
            connection = e.target.result;
            close = connection.close.bind(connection);
            connection.close = function() {
              throw new Error('Você não pode fechar diretamente a conexão');
            }
          }
          resolve(connection);
        };

        openRequest.omerror = (e) => {
          console.error(e.target.error);
          reject(e.target.name);
        };
      });
    }

    static closeStore() {
      if (connection) {
        close();
        connection = null;
      }
    }

    static _createStores(connection) {
      stores.forEach((store) => {
        if (connection.objectStoreNames.contains(store)) {
          connection.deleteObjectStore(store);
        }
        connection.createObjectStore(store, { autoIncrement: true });
      });
    }
  };
})();
