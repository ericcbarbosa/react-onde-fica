import React from 'react';

const MessagesList = ({ messages }) => {
  const classNames = () => {
    return `messages-list txt-color-danger txt-center`;
  };

  return (
    <ul className={classNames()}>
      { messages.length > 0 && messages.map(message =>
        <li key={Math.random() * 1000} className="messages-list__item">{message}</li>)
      }
    </ul>
  );
};

export default MessagesList;