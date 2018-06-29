import React, {Component} from 'react';
import Button from '../button/Button';

export default class SearchCep extends Component {
  state = {
    cep: '',
  };

  handleInput = (e) => {
    const cep = e.target.value;
    this.setState({ cep });
  };

  handleSetCep = (e) => {
    e.preventDefault();
    const value = this.state.cep.replace(/\D/g, '');
    this.props.handleSetCep(value);
  };

  render() {
    return (
      <form className="search-cep">
        <input
          className="search-cep__input"
          type="search"
          placeholder="00000-000"
          title="O formato do CEP deve ser 00000-000"
          onInput={ this.handleInput }
          value={ this.state.cep }/>

        <Button
          onClick={ this.handleSetCep }
          loading={ this.props.loading }/>
      </form>
    );
  };
};