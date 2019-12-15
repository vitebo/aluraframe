class HttpService {
  static get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4) {
          return
        }
        if (xhr.status === 200) {
          return resolve(JSON.parse(xhr.responseText));
        }
        console.error(xhr.responseText);
        return reject(xhr.responseText);
      };
      xhr.send();
    });
  }
}
