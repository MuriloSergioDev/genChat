import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import socket from '../../services/socket';
import MessageChat from '../../components/messageChat';
// import { Container } from './styles';

interface MessageFeed {
    data: string,
    autor: string
}

const MessageBoard: React.FC = () => {

    const [messageFeed, setMessageFeed] = useState<object[] >([]);
    const [actualMessage, setActualMessage] = useState<MessageFeed>();
    const scroll = useRef<HTMLDivElement>(null);

    useLayoutEffect(()=>{
        autoScroll();
    },[messageFeed])

    useEffect(() => {
        socket.on('user login', (msg: MessageFeed) => {
            setActualMessage(msg);
        });

        socket.on('post message', (msg: MessageFeed) => {
            setActualMessage(msg);
        });
    }, []);

    function autoScroll() {
        if (scroll != null && scroll.current != null) {
            scroll.current.scrollIntoView({ behavior: "smooth" });    
        }
        
    }

    function updateMessage() {
        if (actualMessage)  {
            const msgCopy = Array.from(messageFeed);
            msgCopy.push(actualMessage);
            setMessageFeed(msgCopy);
            setActualMessage(undefined);
        }
    }

    if (actualMessage) {
        updateMessage();
    }
    

    return (
        <div className="messages-feed"  >
            {
                messageFeed
                    ?
                    messageFeed.map((message: any, index: number) => {
                        return <MessageChat key={index} message={message.data} autor={message.autor} />
                    })
                    :
                    <div>Loading...</div>
            }
            <div ref={scroll}></div>
        </div>
    );
}

export default MessageBoard;