export default class GoogleMapsApi {
  config = {
    baseUrl: 'https://maps.googleapis.com/maps/api/geocode',
    type: 'json',
    apiKey: 'AIzaSyBMGYIRPdV7NICfIGNV4XPfeEo4idLXi28',
    sensor: true,
  };

  messages = [];

  searchByCep(cep) {
    const {
      baseUrl,
      apiKey,
      sensor,
      type
    } = this.config;

    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/${type}?address=${cep}&key=${apiKey}&sensor=${sensor}`)
        .then(response => response.json())
        .then(({ results = [] }) => {
          if (results.length > 0) {
            resolve ({
              status: true,
              payload: results,
            });
          } else {
            this.messages.push(`Nenhum resultado encontrado para o cep ${cep}`);

            reject({
              status: false,
              messages: this.messages,
            });
          }
        })
        .catch((e) => reject({
            status: false,
            messages: this.messages.push(`Ops! Ocorreu um erro: ${e}`),
          })
        );
    });
  }
};