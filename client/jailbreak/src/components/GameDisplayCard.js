import { Link, useHistory } from "react-router-dom";
import { deleteGame } from "../services/gameService";
import "./GameDisplayCard.css";
import One from "./1.png";
import Two from "./2.png";
import Three from "./3.png";

function GameDisplayCard({title, game, resetGames, gameNum}){

    const history = useHistory();

    function onDelete(){
        deleteGame(game)
            .then(result => {
                resetGames();
            });
    }

    function onGoToGameCreation(){
        history.push("/create-game", {gameNumber: gameNum})
    }

    function onGoToGame(){
        history.push("/game", {game: game})
    }

    return(
        <>
            <div className="col">
                <div className="card game-card">
                    <div className="card-body d-flex flex-column align-items-center">
                        <h4 className="card-title">Game {gameNum}</h4>
                        {
                            game ? 
                            <>
                                <h5 className="card-title">{game.characterName}</h5>
                                <div className="card-body">
                                    <div>
                                        {
                                            gameNum == 1 ? <img src={One}></img> :
                                            gameNum == 2 ? <img src={Two}></img> :
                                            <img src={Three}></img>
                                        }
                                    </div>
                                </div> 
                                <div className="mt-auto container">
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col">
                                            <button className="btn btn-success w-100" onClick={onGoToGame}>Start</button>
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col">
                                            <button className="btn btn-danger w-100" 
                                                onClick={onDelete}>Delete</button>
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                </div>
                            </>                            
                            : 
                            <>
                                <h5 className="card-title">- Empty -</h5>
                                <div className="mt-auto container">
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col">
                                            <button className="btn btn-warning w-100" onClick={onGoToGameCreation}>Create Game</button>
                                        </div>
                                        <div className="col-3"></div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameDisplayCard;