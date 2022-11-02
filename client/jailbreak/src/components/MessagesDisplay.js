import { useState } from "react";
import { useEffect } from "react";
import "./MessagesDisplay.css"

function MessagesDisplay({messagesObject, updateState}){

    const [messages, setMessages] = useState([]);
    const [addExtraSpace, setAddExtraSpace] = useState(true);

    // useEffect(() => {
    //     if(localStorage.getItem("eventState")){
    //         const eventState = JSON.parse(localStorage.getItem("eventState"));

    //         eventState.messages.forEach(addMessageToFront);
    //     }
    // }, [updateState]);
    
    useEffect(() => {
        messagesObject.messages.forEach(addMessageToFront);
    }, [messagesObject]);


    function addMessageToFront(message){
        setMessages(oldMessages => {
            const newMessages = [...oldMessages];

            if(addExtraSpace){
                newMessages.unshift(message + " ");
                setAddExtraSpace(false);
            }else{
                newMessages.unshift(message);
                setAddExtraSpace(true);
            }

            return newMessages;  
        });
    }

    function handleMessages(){
        return(
            <>
                {messages.map((value, index) => {
                    return(
                        <p key={`${value}-${index}`} className={index === 0 ? "fade-in" : ""}>{value}</p>)}
                    )
                }
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