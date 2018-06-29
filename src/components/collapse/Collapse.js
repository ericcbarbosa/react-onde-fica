import React, { Component } from 'react';

export default class Collapse extends Component {
  state = {
    asideIsOpen: true,
  };

  getSlottedChildren = (slot) =>
      this.props.children.filter(item => item && item.props.slot === slot);

  collapseClassNames = () => {
    const defaultClass = 'collapse';

    return (this.getSlottedChildren('aside').length > 0 && this.getSlottedChildren('content').length > 0)
        ? `${defaultClass} collapse--visible`
        : defaultClass;
  };

  iconClassNames = () => {
    const defaultClass = 'collapse__aside__icon fas';

    return (this.state.asideIsOpen)
        ? `${defaultClass} fa-chevron-left`
        : `${defaultClass} fa-chevron-right`;
  };

  asideClassNames = () => {
    const defaultClass = 'collapse__aside';

    return (this.state.asideIsOpen)
        ? defaultClass
        : `${defaultClass} collapse__aside--docked`;
  };

  toggleAside = () =>
    this.setState({ asideIsOpen: !this.state.asideIsOpen });

  closeCollapse = () => {
    this.props.closeCollapse();
  };

  render() {
    return (
      <section className={ this.collapseClassNames() }>
        <div className="collapse__wrapper">
          <button
            className="collapse__close"
            onClick={ this.closeCollapse }>
            Fechar Mapa
          </button>
          { this.getSlottedChildren('aside').length > 0 &&
            (
              <aside className={ this.asideClassNames() }>
                <button
                    className="collapse__aside__button"
                    onClick={ this.toggleAside }
                    title="Informações">
                  <i className={ this.iconClassNames() } />
                </button>
                <div className="collapse__aside__body">
                  { this.getSlottedChildren('aside') }
                </div>
              </aside>
            )
          }

          { this.getSlottedChildren('content').length > 0 &&
            (
              <article className="collapse__content">
                { this.getSlottedChildren('content') }
              </article>
            )
          }
        </div>
      </section>
    );
  };
};
