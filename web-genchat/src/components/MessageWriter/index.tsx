import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import socket from '../../services/socket';
// import { Container } from './styles';

type Props = {

}

const MessageWriter: React.FC<Props> = () => {

  const [message, setMessage] = useState({
    data: '',
    autor: ''
  });

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
      <button className="button button-send">Send</button>
    </form>);
}

export default MessageWriter;