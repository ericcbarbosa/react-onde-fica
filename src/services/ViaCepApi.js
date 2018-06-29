import Jsonp from "jsonp";

export default class ViaCepApi {
  config = {
    baseUrl: 'https://viacep.com.br/ws',
    type: 'json',
  };

  searchByCep(cep, callback) {
    return new Promise((resolve, reject) => {
      return Jsonp(`${this.config.baseUrl}/${cep}/${this.config.type}/`, null, (err, data) => {
        if (err) {
          reject(err)
        }

        if (typeof(callback) === 'function') {
          callback();
        }

        resolve(data);
      });
    });
  };

}