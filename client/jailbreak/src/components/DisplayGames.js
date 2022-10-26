import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./DisplayGame.css"

function DisplayGames(){
    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="toward-center">
            <h1>Your Saved Games</h1>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        {/* Cards */}
                        <div className="col">
                            <div className="card game-card">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <h4 className="card-title">Game 1</h4>
                                    <h5 className="card-title">Name 1</h5>
                                    <button className="btn btn-success mt-auto">Start Game</button>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card game-card">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <h4 className="card-title">Game 2</h4>
                                    <h5 className="card-title">Name 2</h5>
                                    <button className="btn btn-success mt-auto">Start Game</button>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card game-card">
                                <div className="card-body d-flex flex-column align-items-center">
                                    <h4 className="card-title">Game 3</h4>
                                    <h5 className="card-title">- Empty -</h5>
                                    {/* TODO: navigate to game creation screen */}
                                    <button className="btn btn-warning mt-auto">Create Game</button>
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default DisplayGames;