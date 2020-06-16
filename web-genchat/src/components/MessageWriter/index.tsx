import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import socket from '../../services/socket';
import stylesHome from '../../pages/Home/style.module.css';
import stylesMain from '../../pages/Main/style.module.css';

type Props = {
  darkMode : boolean
}

const MessageWriter: React.FC<Props> = ({darkMode}) => {

  const [message, setMessage] = useState({
    data: '',
    autor: ''
  });
  
  const buttonStyle = [stylesHome.button, stylesMain.buttonSend];

  useEffect(() => {
    const autor = localStorage.getItem('username');

    if (autor) {
      setMessage(prevState => {
        return { ...prevState, autor: autor }
      });
    }
  }, [])

  function handleMessageSubmit(e: FormEvent) {
    e.preventDefault();
    socket.emit('chat message', message);

    setMessage(prevState => {
      return { ...prevState, data: '' }
    });
  }

  darkMode ? buttonStyle.push(stylesHome.buttonDarkMode) : buttonStyle.push(stylesHome.buttonLightMode);

  return (
    <form onSubmit={handleMessageSubmit}>
      <input type="text" placeholder='text something here then press enter or send button'
        autoFocus
        value={message.data}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          setMessage(prevState => {
            return { ...prevState, data: value }
          });
        }}></input>
      <button className={buttonStyle.join(' ')}>Send</button>
    </form>);
}

export default MessageWriter;