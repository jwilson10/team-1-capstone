import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./CreateGame.css";
import { useState } from "react";

function CreateGame(){
    const [game, setGame] = useState({
        name: ""
    });

    const [errors, setErrors] = useState([]);

    function handleChange(evt){
        const nextGame = {...game};

        nextGame.name = evt.target.value;
        
        setGame(nextGame);

        //Just testing errors, TODO: remove this when proper error handling is in place.
        if(nextGame.name === ""){
            setErrors([]);
        }else{
            setErrors(["Buh", "BuhBuh", "UhBuh", nextGame.name]);
        }

        console.log(nextGame);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        evt.stopPropagation();

        //TODO: Use the gameService to create a new game.
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
                        <input type="text" name="characterName" id="characterName" onChange={handleChange}></input>
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