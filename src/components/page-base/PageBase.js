import React from 'react';
import Footer from '../footer/Footer';

const PageBase = ({className, title, children}) => {
  const classNames = () =>
    className ? `page-content ${className}` : 'page-content';

  return (
    <div className="page-content">
      <section className={ classNames() }>
        {title && <h1>{title}</h1>}
        {children}
      </section>

      <Footer />
    </div>
  )
};

export default PageBase;