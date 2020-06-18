import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import socket from '../../services/socket';

import MessageWriter from '../../components/MessageWriter';
import MessageBoard from '../../components/MessageBoard';

import stylesHome from '../Home/style.module.css';
import stylesMain from './style.module.css';

import Switch from 'react-switch';
import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { ClipLoader } from 'react-spinners';


const Main: React.FC = () => {

    const history = useHistory();

    const [connection, setConnection] = useState(false);
    const [darkMode, setDarkMode] = useState(getInitialMode());
    
    const containerStyle = [stylesMain.container];
    const buttonLogoutStyle = [stylesMain.buttonLogout];

    useEffect(() => {
        let mount = true;

        if (mount) {
            socket.connect();
        }
        
        if(localStorage.getItem('username') === null) localStorage.setItem('username', 'anonimo')

        socket.on('connect', () => {
            setConnection(true);
            socket.emit('new user entering', localStorage.getItem('username'));
        });
        
        return () => {
            socket.removeAllListeners();
            mount = false;
        };
    }, [])

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    function handleUserLogout() {
        socket.emit('user logout', localStorage.getItem('username'));
        socket.disconnect();
        localStorage.removeItem('username');
        history.push('/');
    }

    function getInitialMode() {
        let savedMode = false;

        if (localStorage.getItem('darkMode') != null) {
            savedMode = localStorage.getItem('darkMode') === 'true';
        }

        return savedMode;
    }

    darkMode ? containerStyle.push(stylesMain.containerDarkMode) : containerStyle.push(stylesMain.containerLightMode);
    darkMode ? buttonLogoutStyle.push(stylesMain.buttonLogoutDarkMode) : buttonLogoutStyle.push(stylesMain.buttonLogoutLightMode);

    return (
        <>
            <div className={containerStyle.join(' ')}>
                <div className={stylesMain.header}>
                    <button className={buttonLogoutStyle.join(' ')} onClick={handleUserLogout}><FiArrowLeft></FiArrowLeft>Logout</button>
                    <h1>GenChat</h1>

                    {darkMode ? <FiMoon className={stylesMain.themeIcon}></FiMoon> : <FiSun className={stylesMain.themeIcon}></FiSun>}
                    <Switch
                        onChange={() => { setDarkMode(prevMode => !prevMode) }}
                        checked={darkMode}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        className={stylesHome.switch}
                    />
                </div>
                {connection ?
                    <>
                        <MessageBoard darkMode={darkMode} />
                        <div className={stylesMain.messagesSender}>
                            <MessageWriter darkMode={darkMode} />
                        </div>
                    </>
                    :
                    <div className={stylesMain.loader}>
                        <ClipLoader
                            color={darkMode ? 'white' : 'black'}
                            size={50}
                        ></ClipLoader>
                    </div>
                }
            </div>
        </>
    );
}

export default Main;