import { useContext } from "react";
import {Link} from "react-router-dom";
import AuthContext from "../context/AuthContext";


function StartScreen() {
    const auth = useContext (AuthContext);
    
    return (
        <>
            <div>
                <div className="">
                    <h1 className=" d-flex align-items-center justify-content-center m-5" >J A I L B R E A K</h1>
                </div>
                <div className="row justify-content-center  mt-5">
                    <Link to="/login" className="row justify-content-center  mt-5">
                        <button className="btn btn-dark" type="submit">Enter Game</button>
                    </Link>                    
                </div>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
        {
        auth.user ? <Link className=" btn btn-dark  btn-sm  m-5" data-bs-toggle="button" type="submit" to="/all-games">View games</Link>: <></>
        }
        </div> 
        </>
        
    )
}
export default StartScreen;