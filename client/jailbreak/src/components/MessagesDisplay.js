import { useState } from "react";
import { useEffect } from "react";
import { updateJustAddedAndFinished } from "../services/gameEventService";
import "./MessagesDisplay.css"

function MessagesDisplay({messagesObject, updateState, updateGame}){

    const DEFAULT_MESSAGES_TIMER = 100;
    const PAUSE_CYCLES_DEFAULT = 10;
    const CHARACTERS_PER_PAUSE = 2.7;

    const [messages, setMessages] = useState([]);
    const [newMessages, setNewMessages] = useState([]);
    const [messagesUpdate, setMessagesUpdate] = useState(undefined);
    const [addExtraSpace, setAddExtraSpace] = useState(true);
    const [pauseForCycles, setPauseForCycles] = useState(0); 
    
    
    
    useEffect(() => {
        if(messagesObject.immediate){
            messagesObject.messages.forEach(addMessageToFront);
        }else{
            messagesObject.messages.forEach(addNewMessages);   
        }
    }, [messagesObject]);

    useEffect(() => {
        // console.log(newMessages);
        if(pauseForCycles <= 0){
            //Display first message, and pop it
            setNewMessages(oldMessages => {                                
                if(oldMessages.length <= 0){
                    setPauseForCycles(0);
                    return oldMessages;
                }

                const newMessages = [...oldMessages];
                const message = newMessages.shift();
                
                addMessageToFront(message);

                //TODO: Extract these blocks into functions
                let messageObject = undefined;
                if(typeof message === "string"){
                    messageObject = {message: message};
                } else{
                    messageObject = message;
                }    
                
                setPauseForCycles(Math.floor(PAUSE_CYCLES_DEFAULT + (messageObject.message.length / CHARACTERS_PER_PAUSE)));

                return newMessages;  
            });
        }
    }, [pauseForCycles]);

    function addNewMessages(message){
        setNewMessages(oldMessages => {
            // debugger;

            const newNewMessages = [...oldMessages];
            
            let messageObject = undefined;
            if(typeof message === "string"){
                messageObject = {message: message};
            } else{
                messageObject = message;
            }

            newNewMessages.push(messageObject);

            return newNewMessages;  
        });
    }

    function addMessageToFront(message){
        setMessages(oldMessages => {
            const newMessages = [...oldMessages];

            let messageObject = undefined;
            if(typeof message === "string"){
                messageObject = {message: message};
            } else{
                messageObject = message;
            }
            
            if(addExtraSpace){
                messageObject.message += " ";
                newMessages.unshift(messageObject);
                setAddExtraSpace(false);
            }else{
                newMessages.unshift(messageObject);
                setAddExtraSpace(true);
            }

            return newMessages;  
        });
    }

    function handleMessages(){
        return(
            <>
                {messages.map((value, index) => {
                    const message = value.message;
                    const gameEvent = value.gameEvent;
                    
                    if(gameEvent && gameEvent.finished === false){
                        //Async, but I don't think timing should matter too much here - Ethan
                        updateJustAddedAndFinished(gameEvent, false, true);
                    }

                    return(
                        <p key={`${message}-${index}`} className={index === 0 ? "fade-in" : ""}>{message}</p>)}
                    )
                }
            </>
        );
    }

    if(!messagesUpdate){
        setMessagesUpdate(setInterval(() => {
                setPauseForCycles(oldPause => {
                    return oldPause - 1;
                });  
            }, DEFAULT_MESSAGES_TIMER)
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