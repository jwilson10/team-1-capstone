import { useState } from "react";
import { useEffect } from "react";
import "./MessagesDisplay.css"

function MessagesDisplay({updateState}){

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        //addMessageToFront("Messages Display: " + updateState.number);
    }, [updateState]);

    function addMessageToFront(message){
        const newMessages = [...messages];
        newMessages.unshift(message);

        setMessages(newMessages);
    }

    function handleMessages(){
        return(
            <>
                {messages.map((value, index) => 
                    <p key={`${value}-${index}`} className={index === 0 ? "fade-in" : ""}>{value}</p>)}
            </>
        );
    }

    return(
        <>
            <div id="overlay"></div>
            <div id="messages">
                {handleMessages()}
            </div>
        </>
    );
}

export default MessagesDisplay;