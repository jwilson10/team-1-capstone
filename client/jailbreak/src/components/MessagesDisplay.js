import { useState } from "react";
import { useEffect } from "react";
import "./MessagesDisplay.css"

function MessagesDisplay({message, updateState}){

    const [messages, setMessages] = useState([]);
    const [addExtraSpace, setAddExtraSpace] = useState(true);

    useEffect(() => {
        //addMessageToFront("Messages Display: " + updateState.number);
    }, [updateState]);
    
    useEffect(() => {
        addMessageToFront(message.message);
    }, [message]);


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
                    console.log(index);

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