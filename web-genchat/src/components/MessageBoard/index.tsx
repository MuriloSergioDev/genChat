import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import socket from '../../services/socket';
import MessageChat from '../MessageChat';
import stylesMain from '../../pages/Main/style.module.css';

interface MessageFeed {
    data: string,
    autor: string
}

type Props = {
    darkMode: boolean
}

const MessageBoard: React.FC<Props> = ({ darkMode }) => {

    const [messageFeed, setMessageFeed] = useState<object[]>([]);
    const [actualMessage, setActualMessage] = useState<MessageFeed>();
    const scroll = useRef<HTMLDivElement>(null);
    
    const messageFeedStyle = [stylesMain.messagesFeed];

    useLayoutEffect(() => {
        autoScroll();
    }, [messageFeed])

    useEffect(() => {
        socket.on('user login', (msg: MessageFeed) => {
            setActualMessage(msg);
        });

        socket.on('post message', (msg: MessageFeed) => {
            setActualMessage(msg);
        });

        return () => {
            socket.removeAllListeners();            
        };
    }, []);

    function autoScroll() {
        if (scroll != null && scroll.current != null) {
            scroll.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    function updateMessage() {
        if (actualMessage) {
            const msgCopy = Array.from(messageFeed);
            msgCopy.push(actualMessage);
            setMessageFeed(msgCopy);
            setActualMessage(undefined);
        }
    }

    if (actualMessage) {
        updateMessage();
    }

    darkMode ? messageFeedStyle.push(stylesMain.messagesFeedDarkMode) : messageFeedStyle.push(stylesMain.messagesFeedLightMode);

    return (
        <div className={messageFeedStyle.join(' ')}  >
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