import express from 'express'
import routes from './routes';
import socketIO from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app)
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('nova conexao');

    socket.on('new user entering' , (user)=>{
        const msg = {
            data: `${user} logged in`,
            autor: 'server'
        }
        io.emit('user login', msg);
        console.log(`${user} has conneted`);
    });
    
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg.data);
        io.emit('post message', msg);
    });

    socket.on('user logout' , (user)=>{
        console.log(`${user} has disconneted`);
    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//app.use(express.json());
app.use(routes);

export default server;

