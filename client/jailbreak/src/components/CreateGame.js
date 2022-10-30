import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./CreateGame.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { createGame } from "../services/gameService";

function CreateGame(){
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const auth = useContext(AuthContext);

    function handleChange(evt){
        const nextName = evt.target.value;
        
        setName(nextName);

        //Just testing errors, TODO: remove this when proper error handling is in place.
        if(nextName === ""){
            setErrors([]);
        }else{
            setErrors(["Buh", "BuhBuh", "UhBuh", nextName]);
        }
    }

    function handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();

        if(history.location.state && history.location.state.gameNumber){
            const newGame = {
                "userId": auth.user.userId,
                "characterName": name,
                "gameNumber": history.location.state.gameNumber
            }
            
            createGame(newGame).then(result => history.push("/all-games")).catch(console.log);
        }else{
            //TODO: Error, don't know what the game number is
        }
    }

    function displayErrors(){
        
        if(errors.length > 0){
            return(
                <div className="row justify-content-center mt-4">
                    <div className="errors alert alert-danger">
                        {errors.map(
                            (value, index) => <p key={`${value}-${index}`}>{value}</p>
                            )}
                    </div>
                </div>
            )
        }else{
            return(<></>);
        }
    }

    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="container toward-center">
                <h1>Start a Game</h1>
                <form className="form mt-4" onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <label htmlFor="characterName">Character Name:</label>
                    </div>
                    <div className="row justify-content-center">
                        <input type="text" name="characterName" id="characterName" onChange={handleChange} autoFocus></input>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <button className="btn btn-success">Start</button>
                    </div>
                </form>
                {displayErrors()}
            </div>
        </>
    )
}

export default CreateGame;