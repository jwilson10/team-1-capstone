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

/*
    {
        "gameId": 1,
        "userId": 1,
        "characterName": "Ethan",
        "gameNumber": 1,
        "inventorySlotList": [
          {
            "slotId": 2,
            "gameId": 2,
            "resourceId": 1,
            "quantity": 10
          }
        ]
    }
*/

function GameScreenMain(){    
    const [updateState, setUpdateState] = useState(
        {number: 0}
        );
    const [resourceUpdate, setResourceUpdate] = useState({});
    const [initialResources, setInitialResources] = useState([]);
    const [game, setGame] = useState({});

    //This is an object instead of a string because setEffect in the message display
    //didnt trigger when the string was set to its previous value
    const [message, setMessage] = useState({
        message: ""
    });

    const auth = useContext(AuthContext);

    const history = useHistory();

    const UPDATE_DELAY_IN_MS = 20000;

    useEffect(() =>{
        if(history.location.state && history.location.state.game){
            setInterval(update, UPDATE_DELAY_IN_MS);

            setGame(history.location.state.game);
            setInitialResources(history.location.state.game.inventorySlotList);
            console.log(history.location.state.game);
        }else{
            //TODO: Error, no game specified. Return to home screen.
            console.log("No game specified!");
        }
    }, []);

    function update(){
        setUpdateState(previousState => {
            const newState = {...previousState};
            newState.number += 1;
            return newState;
        });
    }

    function updateResource(evt){
        const resourceName = evt.target.getAttribute("resourceName"); 
        const amount = evt.target.getAttribute("amount"); 

        setResourceUpdate({
            resourceName: resourceName,
            amount: amount
        });
        
        if(amount > 0){
            setMessage({
                message: `you gained ${amount} ${resourceName}`
            });
        }else{
            setMessage({
                message: `you lost ${amount} ${resourceName}`
            });
        }
    }

    async function updateGame(){
        const result = await findGame(game.gameId);
        setGame(result);
    }

    function saveGame(){
        console.log(game);
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
                                <MessagesDisplay message={message} updateState={updateState}></MessagesDisplay>
                            </div>
                            <div className="col col-9">
                                <div className="col">
                                    <div className="row container mt-4">
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Cage</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Room</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Outside</button>
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
                                                    <ActionButtons1 updateResource={updateResource}></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Craft</h6>
                                                    <ActionButtons1 updateResource={updateResource}></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Trade</h6>
                                                    <ActionButtons1 updateResource={updateResource}></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 resources">
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Resources</h6>
                                                    <ResourceDisplay inventorySlotList={game.inventorySlotList} resourceUpdate={resourceUpdate} game={game} updateGame={updateGame}></ResourceDisplay>
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