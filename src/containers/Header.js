import React from 'react';

import Logo from '../components/logo/Logo';
import SearchCep from '../components/search-cep/SearchCep';
import MessagesList from '../components/messages-list/MessagesList';

const Header = ({setCep, loading, error}) => {
  const handleSetCep = (cep) => {
    setCep(cep);
  };

  return (
    <header>
      <Logo/>
      <SearchCep
        loading={ loading }
        handleSetCep={ handleSetCep }/>

      { error.length > 0 && <MessagesList messages={error}/> }
    </header>
  );
};

export default Header;