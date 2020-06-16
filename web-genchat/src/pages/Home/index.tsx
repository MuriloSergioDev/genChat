import React, { useState, useEffect } from 'react';

import homeImg from '../../assets/genChatImg.jpg';
import stylesHome from './style.module.css';

import Switch from 'react-switch';
import {FiSun ,FiMoon} from 'react-icons/fi';
import UserInput from '../../components/UserInput';


const Home: React.FC = () => {
    
    const [darkMode, setDarkMode] = useState(getInitialMode());

    const containerStyle = [stylesHome.container];
    
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }, [darkMode])

    function getInitialMode() {
        let savedMode = false;
        if (localStorage.getItem('darkMode')!= null) {
            savedMode = localStorage.getItem('darkMode') === 'true';    
        }
        return savedMode
    }

    darkMode ? containerStyle.push(stylesHome.containerDarkMode) : containerStyle.push(stylesHome.containerLightMode);
    
    return (
        <div className={containerStyle.join(' ')}>
            <div className={stylesHome.header}>
                <h1>GenChat</h1>
                {darkMode ? <FiMoon className={stylesHome.themeIcon}></FiMoon> : <FiSun className={stylesHome.themeIcon}></FiSun>}
                <Switch
                    onChange={() => { setDarkMode(prevMode => !prevMode) }}
                    checked={darkMode}
                    checkedIcon={false}
                    uncheckedIcon={false}
                    className={stylesHome.switch}
                />
            </div>

            <div className={stylesHome.content}>
                <img src={homeImg} alt="homeImg" className={stylesHome.homeImg} />
                <UserInput darkMode={darkMode}/>
            </div>
        </div>
    );
}

export default Home;