import io from 'socket.io-client';

const socket = io('http://localhost:3333', { forceNew: false, autoConnect : false });

export default socket;
