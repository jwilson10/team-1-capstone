import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./GameScreenMain.css"
import ActionButtons1 from "./ActionButtons1";
import ResourceDisplay from "./ResourceDisplay";
import MessagesDisplay from "./MessagesDisplay";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { findGame } from "../services/gameService";
import ActionButtons2 from "./ActionButtons2";
import ActionButtons3 from "./ActionButtons3";
import { createGameEvent, updateJustAdded } from "../services/gameEventService";
import { findEventById, findEventByName } from "../services/eventService";
import handleFreshEvents from "./components-util/GSM_handleFreshEvents";

function GameScreenMain(){    
    const [stateForUpdate, setStateForUpdate] = useState(
            {number: 0}
        );
    const [resourceUpdate, setResourceUpdate] = useState(undefined);
    const [initialResources, setInitialResources] = useState([]);
    const [game, setGame] = useState({uninitialized: true});
    const [updateInterval, setUpdateInterval] = useState(undefined);
    const [triggeredStartEvent, setTriggeredStartEvent] = useState(false);
    
    //This is an object instead of a string because useEffect in the message display
    //didnt trigger when the string was set to its previous value
    const [messages, setMessages] = useState({
        messages: []
    });

    const auth = useContext(AuthContext);

    const history = useHistory();

    const UPDATE_DELAY_IN_MS = 2000;

    useEffect(() =>{
        async function getGameFromHistory(){
            if(history.location.state && history.location.state.game){    
                //The game stored in history state doesnt update, so we need to grab the updated
                //version from the backend.
                const upToDateGame = await findGame(history.location.state.game.gameId);
    
                setGame(upToDateGame);
                setInitialResources(upToDateGame.inventorySlotList);
            }else{
                //TODO: Error, no game specified. Return to home screen.
                console.log("No game specified!");
            }
        }

        getGameFromHistory();
    }, []);

    useEffect(() => {
        if(!game.uninitialized && !triggeredStartEvent){
            triggerEvent("start");
            setTriggeredStartEvent(true);
        }
    }, [stateForUpdate]);

    function getEmptyEventState(){
        const eventState = {
            tutorialComplete: false,
            showMinionsButton: false,
            noMoreMinions: false,
            canTalk: false,
            canBribe: false,
            hasBribed: false,
            roomOpenedUp: false,
            outsideOpenedUp: false,
            cheeseIncrement: 0,
            yogiesIncrement: 0,
            messages: [],
        };

        return eventState;
    }
    
    async function handleEventState(){
        //Handle event state messages
        if(localStorage.getItem("eventState")){
            const eventState = JSON.parse(localStorage.getItem("eventState"));

            const newMessages = {messages: []};
            eventState.messages.forEach(message => {
                if(message){
                    newMessages.messages.push(message);
                }   
            });

            if(newMessages.messages.length > 0){
                setMessages(newMessages);
            }
        }

        if(game && game.eventsList){
            const eventState = getEmptyEventState();

            //Map gameEvents to events
            const events = await Promise.all(game.eventsList.map(async gameEvent => {
                const event = await findEventById(gameEvent.eventId);
                event.gameEventObject = gameEvent;
                return event;
            }));
            
            await Promise.all(events.map(event => {                
                const en = event.eventName;
                if(en === "tutorial"){
                    eventState.tutorialComplete = true;
                }else if(en === "unlock_minions"){
                    eventState.showMinionsButton = true;
                }else if(en.match(/minion_gain_/)){
                    eventState.cheeseIncrement += 3;

                    if(en === "minion_gain_final"){
                        eventState.noMoreMinions = true;
                    }
                }else if(en === "meeting"){
                    eventState.canTalk = true;
                }else if(en === "talk_1"){
                    eventState.canBribe = true;
                }else if(en === "bribe"){
                    eventState.hasBribed = true;
                }

                return handleFreshEvents(event, eventState, game);
            }));

            localStorage.setItem("eventState", JSON.stringify(eventState));
        }
    }

    useEffect(() => {
        handleEventState();
    }, [game]);

    function updateResource(evt){
        const craftingRecipe = JSON.parse(evt.target.getAttribute("craftingRecipe"));
        setResourceUpdate(craftingRecipe);
    }

    async function updateGame(){
        if(game.gameId){
            // console.log("Game ID:" + game.gameId);
            const result = await findGame(game.gameId);
            setGame(result);
        }
    }

    function saveGame(){
        //Todo: Implement. The game pretty much saves on its own though I think, so
        //this may not be necessary.
        console.log(game);
    }

    async function triggerEvent(eventName){
        const eventObj = await findEventByName(eventName);

        if(game.eventsList.find(event => event.eventId === eventObj.eventId)){
            return;
        }

        await createGameEvent({
            eventId: eventObj.eventId,
            gameId: game.gameId,
            justAdded: true
        });

        updateGame();
    }

    function update(){
        setStateForUpdate(previousState => {
            const newState = {...previousState};
            newState.number += 1;
            return newState;
        });
    }

    if(!updateInterval){
        //Initialize the event state local var
        localStorage.setItem("eventState", JSON.stringify(getEmptyEventState()));

        setUpdateInterval(setInterval(update, UPDATE_DELAY_IN_MS));
    }

    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="container-fluid toward-center">
                <div className="row more-columns">
                    <div className="col col-1"></div>
                    <div className="col col-10 game">
                        <div className="row">
                            <div className="col messages">
                                <MessagesDisplay messagesObject={messages} stateForUpdate={stateForUpdate}></MessagesDisplay>
                            </div>
                            <div className="col col-9">
                                <div className="col">
                                    <div className="row container mt-4">
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Cage</button>
                                        </div>
                                        <div className="col">
                                            {JSON.parse(localStorage.getItem("eventState")).roomOpenedUp &&
                                                <button className="btn btn-secondary w-100">Room</button>
                                            }
                                        </div>
                                        <div className="col">
                                            {JSON.parse(localStorage.getItem("eventState")).outsideOpenedUp &&
                                                <button className="btn btn-secondary w-100">Outside</button>
                                            }
                                        </div>
                                        <div className="col col-6">
                                        </div>
                                    </div>
                                    <div className="row container mt-4">
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Basic</h6>
                                                    <ActionButtons1 updateResource={updateResource} triggerEvent={triggerEvent}></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Craft</h6>
                                                    <ActionButtons2 updateResource={updateResource} stateForUpdate={stateForUpdate}></ActionButtons2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Trade</h6>
                                                    <ActionButtons3 updateResource={updateResource}></ActionButtons3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 resources">
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Resources</h6>
                                                    <ResourceDisplay stateForUpdate={stateForUpdate} resourceUpdate={resourceUpdate} game={game} updateGame={updateGame} triggerEvent={triggerEvent} setMessages={setMessages}></ResourceDisplay>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row container mt-4">
                                        <div className="col-9">
                                        </div>
                                        <div className="col-3">
                                            <button className="btn btn-success w-100" onClick={saveGame}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-1"></div>
                </div>
            </div>
        </>
    )
}

export default GameScreenMain;