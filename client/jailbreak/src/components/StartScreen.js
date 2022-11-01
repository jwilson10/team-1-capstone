import { useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./StartScreen.css";


function StartScreen() {
    const auth = useContext (AuthContext);
    
    return (
        <>
            <div>
                <div className="d-flex align-items-center justify-content-center start-logo">
                    <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                        <text x="50%" y="50%" className="logo">Jailbreak</text>
                    </svg>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                {auth.user ? 
                <Link to="/all-games">
                    <button className="btn btn-dark btn-lg">View All Games</button>
                </Link>: 
                <Link to="/login">
                    <button className="btn btn-dark btn-lg">Log in</button>
                </Link>  
                }                  
                </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
        </div> 
        </>
        
    )
}
export default StartScreen;