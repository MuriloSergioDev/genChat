import React from 'react';

// import { Container } from './styles';

type Props = { 
    message: string,
    autor : string
}

const messageChat: React.FC<Props> = ({message, autor}) => {
    
    return (
        <div className="message">
            {autor} say: {message}
        </div>
        );
}

export default React.memo(messageChat);