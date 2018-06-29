import React, {Component} from 'react';
import PageBase from '../components/page-base/PageBase';
import Header from './Header';
import Collapse from '../components/collapse/Collapse';
import GoogleMapContainer from '../components/google-map-container/GoogleMapContainer'
import { ViaCepApi, GoogleMapsApi } from '../services';

export default class PageHome extends Component {
  state = {
    cep: '',
    loading: 0,
    location: {
      info: null,
      map: null,
    },
    error: [],
  };

  addErrorMessage = (message) => {
    this.setState({
      error: [
        message,
      ],
    });
  };

  setCep = (cep) => {
    const cepRegex = /^[0-9]{8}$/;
    const { loading } = this.state;

    if (cepRegex.test(cep) && !loading) {
      this.setState({ cep }, this.getLocation);
    }

    else {

      this.setState({ error: [] });

      if (cep.length > 9 || cep.length < 8) {
        this.addErrorMessage('O cep informado deve ter entre 8 e 9 dígitos, no formato 00000-000 ou 00000000');
      }
    }
  };

  getLocationInfo = (cep) => new ViaCepApi().searchByCep(cep);

  getLocationMap = (cep) => new GoogleMapsApi().searchByCep(cep);

  getLocation = () => {
    const { cep, location } = this.state;

    this.setState({ loading: 1 });

    const promises = [
      this.getLocationInfo(cep),
      this.getLocationMap(cep),
    ];

    Promise.all(promises)
      .then(response => {
        const [info, map] = response;
        const nextLocation = {
          ...location,
          info,
          map: map.payload[0],
        };

        this.setState({ location: nextLocation, error: [] });
      })
      .catch(({messages}) => {
        this.setState({ error: [] });
        messages.map(msg => this.addErrorMessage(msg));
      })
      .then(() => this.setState({ loading: 0 }));
  };

  getCoordinates = () => {
    const { map } = this.state.location;

    if (map && map.geometry) {
      return {
        lat: map.geometry.location.lat,
        lng: map.geometry.location.lng
      };
    }
  };

  getBairroCidadeEstado = () => {
    return `${this.state.location.info.bairro} - ${this.state.location.info.localidade} / ${this.state.location.info.uf}`;
  };

  closeCollapse = () => {
    const nextLocation = {
      info: null,
      map: null,
    };

    this.setState({ location: nextLocation, error: [] });
  };

  render() {
    return (
      <PageBase className="page-home">

        <Header
          loading={this.state.loading}
          error={this.state.error}
          setCep={this.setCep}/>

        <Collapse closeCollapse={ this.closeCollapse }>
          { this.state.location.info && this.state.location.map &&
            <div slot="aside">
              <h3 className="txt-size-3">{ this.state.location.info.logradouro }</h3>
              <p className="txt-color-medium">{ this.getBairroCidadeEstado() }</p>
              <p>Cep: { this.state.location.info.cep }</p>

              { this.state.location.info.complemento &&
                <p>Complemento: { this.state.location.info.complemento }</p> }

              { this.state.location.info.unidade &&
                <p>unidade: { this.state.location.info.unidade }</p> }

              { this.state.location.info.gia &&
                <p>GIA: { this.state.location.info.gia }</p> }

              { this.state.location.info.ibge &&
                <p>IBGE: { this.state.location.info.ibge }</p> }
            </div>
          }

          { this.state.location.map && this.state.location.info &&
            <GoogleMapContainer
              slot="content"
              zoom={16}
              coordenates={ this.getCoordinates() }
              locationInfo={ this.state.location.info }/>
          }
        </Collapse>
      </PageBase>
    );
  };
}
