import React, { useState } from 'react';
import homeImg from '../../assets/genChatImg.jpg';

import './style.css';
import { useHistory } from 'react-router-dom';
// import { Container } from './styles';

const Home: React.FC = () => {
    const [username, setUsername] = useState('anonimo');
    const history = useHistory();

    function handleUserLogin(e: React.SyntheticEvent) {
        e.preventDefault();
        localStorage.setItem('username', username);
        history.push('/main');
    }

    //console.log('renderizou home');

    return (
        <div className="container">
            <div className="header">
                <h1>GenChat</h1>
            </div>
            <div className="content">
                <img src={homeImg} alt="homeImg" className="homeImg" />
                <form className="form-login" onSubmit={handleUserLogin}>
                    <input 
                    type="text" className="input-username" placeholder="Username"  autoFocus
                    onChange={e=> setUsername(e.target.value)}/>
                    <button className="button">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Home;