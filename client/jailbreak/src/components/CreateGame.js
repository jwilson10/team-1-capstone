import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./CreateGame.css";

function CreateGame(){
    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="container toward-center">
                <h1>Start a Game</h1>
                <form className="form mt-4">
                    <div className="row justify-content-center">
                        <label htmlFor="characterName">Character Name:</label>
                    </div>
                    <div className="row justify-content-center">
                        <input type="text" name="characterName" id="characterName"></input>
                    </div>
                    <div className="row justify-content-center mt-4">
                        <button className="btn btn-success">Start</button>
                    </div>
                </form>

                <div className="row justify-content-center mt-4">
                    <p className="errors alert alert-danger">ERRORS!</p>
                </div>
            </div>
        </>
    )
}

export default CreateGame;