export class HttpService {
  static get(url) {
    return fetch(url)
      .then(res => HttpService._handleErrors(res))
      .then(res => res.json());
  }

  static post(url, dado) {
    return fetch(url, {
      headers: { 'Content-type': 'application/json' },
      method: 'post',
      body: JSON.stringify(dado),
    })
    .then(res => HttpService._handleErrors(res));
  }

  static _handleErrors(res) {
    if (res.ok) {
      return res;
    }
    throw new Error(res.statusText);
  }
}
