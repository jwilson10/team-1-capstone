import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./DisplayGame.css"
import GameDisplayCard from "./GameDisplayCard";
import { useEffect, useState } from "react";
import { findAllForUser } from "../services/gameService";
import { useHistory } from "react-router-dom";


function DisplayGames(){

    const [games, setGames] = useState([]);

    useEffect(() => {
        resetGames();
    }, []);

    function resetGames(){
        findAllForUser().then(result => {
            const newGames = [];
            result.forEach(element => {
                newGames[element.gameNumber - 1] = element;
            });

            setGames(newGames);
        });
    }

    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="toward-center">
            <h1>Your Saved Games</h1>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <GameDisplayCard title="Game 1" game={games[0]} resetGames={resetGames} gameNum="1"></GameDisplayCard>
                        <GameDisplayCard title="Game 2" game={games[1]} resetGames={resetGames} gameNum="2"></GameDisplayCard>
                        <GameDisplayCard title="Game 3" game={games[2]} resetGames={resetGames} gameNum="3"></GameDisplayCard>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default DisplayGames;