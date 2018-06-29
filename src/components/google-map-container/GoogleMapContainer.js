import React, {Component} from 'react';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

export class GoogleMapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  getLocationDetails = () =>
      `${this.props.locationInfo.bairro} - ${this.props.locationInfo.localidade} / ${this.props.locationInfo.uf} - ${this.props.locationInfo.cep}`;

  render() {
    const { google, coordenates, zoom } = this.props;

    return (
      <Map
        google={google}
        zoom={zoom}
        initialCenter={coordenates}
        center={ coordenates }
        onClick={this.onMapClicked}>

        <Marker
          name={'Current location'}
          onClick={this.onMarkerClick}
          position={ coordenates } />

        <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
          <div>
            <p className="txt-size-3 txt-bold txt-mt-0">{ this.props.locationInfo.logradouro }</p>
            <small>{ this.getLocationDetails() }</small>
          </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCEYxtfb4675AKTRg7KUMhiJW9z2q_NGF0',
  language: 'pt-br',
  region: 'BR',
  LoadingContainer: LoadingSpinner,
})(GoogleMapContainer);