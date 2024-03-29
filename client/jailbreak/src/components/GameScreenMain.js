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
import GSM_cageEnvironment from "./components-util/GSM_cageEnvironment";
import GSM_roomEnvironment from "./components-util/GSM_roomEnvironment";
import GSM_outsideEnvironment from "./components-util/GSM_outsideEnvironment";

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

    const [environment, setEnvironment] = useState("cage");

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
            turnOffBribeButton: false,
            roomOpenedUp: false,
            outsideOpenedUp: false,
            escaped: false,
            cheeseIncrement: 0,
            yogiesIncrement: 0,
            messages: [],
            immediateMessage: false
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
                const finished = event.gameEventObject.finished;

                if(en === "bribe"){
                    eventState.turnOffBribeButton = true;
                }

                if(finished){
                    if(en === "tutorial" ){
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
                    }else if(en === "talk_2"){
                        eventState.roomOpenedUp = true;
                    }else if(en === "enter_room"){
                        eventState.outsideOpenedUp = true;
                    }else if(en === "escape"){
                        eventState.escaped = true;
                    }
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

    async function triggerEvent(eventName, finishedByDefault){
        const eventObj = await findEventByName(eventName);

        finishedByDefault = typeof finishedByDefault === "undefined" ? false : finishedByDefault;

        if(game.eventsList.find(event => event.eventId === eventObj.eventId)){
            return;
        }

        await createGameEvent({
            eventId: eventObj.eventId,
            gameId: game.gameId,
            justAdded: true,
            finished: finishedByDefault,
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
                                            <button className={`btn ${environment === "cage" ? "btn-success" : "btn-secondary"} w-100`} onClick={() => setEnvironment("cage")}>Cage</button>
                                        </div>
                                        <div className="col">
                                            {JSON.parse(localStorage.getItem("eventState")).roomOpenedUp &&
                                                <button className={`btn ${environment === "room" ? "btn-success" : "btn-secondary"} w-100`} onClick={() => setEnvironment("room")}>Room</button>
                                            }
                                        </div>
                                        <div className="col">
                                            {JSON.parse(localStorage.getItem("eventState")).outsideOpenedUp &&
                                                <button className={`btn ${environment === "outside" ? "btn-success" : "btn-secondary"} w-100`} onClick={() => setEnvironment("outside")}>Outside</button>
                                            }
                                        </div>
                                        <div className="col col-6">
                                        </div>
                                    </div>
                                    <div className="row container mt-4">
                                        {/* The three different "Main" screens. Changes the middle most view with the buttons */}
                                        {environment==="cage" && <GSM_cageEnvironment updateResource={updateResource} triggerEvent={triggerEvent} stateForUpdate={stateForUpdate}></GSM_cageEnvironment>}
                                        {environment==="room" && <GSM_roomEnvironment updateResource={updateResource} triggerEvent={triggerEvent} stateForUpdate={stateForUpdate}></GSM_roomEnvironment>}
                                        {environment==="outside" && <GSM_outsideEnvironment updateResource={updateResource} triggerEvent={triggerEvent} stateForUpdate={stateForUpdate}></GSM_outsideEnvironment>}
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
                                            {/* <button className="btn btn-success w-100" onClick={saveGame}>Save</button> */}
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