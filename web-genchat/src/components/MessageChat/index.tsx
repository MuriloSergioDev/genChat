import React from 'react';
import stylesMain from '../../pages/Main/style.module.css';
// import { Container } from './styles';

type Props = { 
    message: string,
    autor : string
}

const MessageChat: React.FC<Props> = ({message, autor}) => {
    
    return (
        <div className={stylesMain.message}>
            {autor} say: {message}
        </div>
        );
}

export default React.memo(MessageChat);