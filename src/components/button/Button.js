import React, {Component} from 'react';

export default class Button extends Component {
  btnClassNames = () => {
    const defaultClasses = 'button button--lg button--icon';

    return this.props.loading
        ? `${defaultClasses} button--loading`
        : defaultClasses;
  };

  iconClassNames = () => {
    const defaultIconClass = 'button__icon fas';

    return this.props.loading
      ? `${defaultIconClass} fa-spinner`
      : `${defaultIconClass} fa-search`
  };

  render() {
    const {...attrs} = this.props;

    return (
      <button {...attrs} className={ this.btnClassNames() }>
        <i className={ this.iconClassNames() } />
      </button>
    );
  };
};