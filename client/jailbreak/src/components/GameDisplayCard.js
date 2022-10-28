import { Link } from "react-router-dom";
import { deleteGame } from "../service-doubles/gameServiceDouble";

function GameDisplayCard({title, game, resetGames}){

    function onDelete(){
        deleteGame(game.gameNumber)
            .then(result => resetGames());
    }

    return(
        <>
            <div className="col">
                <div className="card game-card">
                    <div className="card-body d-flex flex-column align-items-center">
                        <h4 className="card-title">{title}</h4>
                        {
                            game ? 
                            <>
                                <h5 className="card-title">{game.characterName}</h5> 
                                <div className="mt-auto container">
                                    <div className="row">
                                        <div className="col-3"></div>
                                        <div className="col">
                                            <Link className="btn btn-success w-100" to="/game">Start</Link>
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
                                            <Link className="btn btn-warning w-100" to="/create-game">Create Game</Link>
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