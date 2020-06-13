import React, { useEffect, useState } from 'react';

import socket from '../../services/socket';

import MessageWriter from '../../components/MessageWriter';
import MessageBoard from '../../components/MessageBoard';
import './style.css';
import { useHistory } from 'react-router-dom';




const Main: React.FC = () => {

    const history = useHistory();
    const [connection, setConnection] = useState(false);


    //console.log('renderizou Main');

    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            setConnection(true);
        });
    }, [])

    useEffect(() => {
        socket.emit('new user entering', localStorage.getItem('username'));
    }, [])

    function handleUserLogout() {
        socket.emit('user logout', localStorage.getItem('username'));
        socket.disconnect();
        localStorage.clear();
        history.push('/');
    }

    return (
        <>
            {connection ?
                <div className="container-main">
                    <div className="header-main">
                        <h1>GenChat</h1>
                        <button className="button-logout" onClick={handleUserLogout}>Logout</button>
                    </div>

                    <MessageBoard />

                    <div className="messages-sender">
                        <MessageWriter />
                    </div>

                </div>
                :
                <div>Loading ...</div>}
        </>
    );
}

export default Main;