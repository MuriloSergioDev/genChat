import React, { useState } from 'react';
import stylesHome from '../../pages/Home/style.module.css';
import { useHistory } from 'react-router-dom';

type Props = {
    darkMode: boolean
}
const UserInput: React.FC<Props> = ({ darkMode }) => {
    
    const history = useHistory();
    
    const [username, setUsername] = useState('anonimo');

    const inputStyle = [];
    const formLoginStyle = [stylesHome.formLogin];
    const buttonStyle = [stylesHome.button];

    function handleUserLogin(e: React.SyntheticEvent) {
        e.preventDefault();
        localStorage.setItem('username', username);
        history.push('/main');
    }

    darkMode ? inputStyle.push(stylesHome.inputDarkMode) : inputStyle.push(stylesHome.inputLightMode);
    darkMode ? formLoginStyle.push(stylesHome.formLoginDarkMode) : formLoginStyle.push(stylesHome.formLoginLightMode);
    darkMode ? buttonStyle.push(stylesHome.buttonDarkMode) : buttonStyle.push(stylesHome.buttonLightMode);

    return (
        <>
            <form className={formLoginStyle.join(' ')} onSubmit={handleUserLogin}>
                <input
                    type="text" className={inputStyle.join(' ')} placeholder="Username" autoFocus
                    onChange={e => setUsername(e.target.value)}
                />
                <button className={buttonStyle.join(' ')}><span>Login</span></button>
            </form>
        </>);
}

export default UserInput;