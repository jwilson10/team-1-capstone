import { Link } from "react-router-dom";

function StartScreen() {
    return (
        <>
            <div>
                <div className="">
                    <h1 className=" d-flex align-items-center justify-content-center m-5" >J A I L B R E A K</h1>
                </div>
                <div className="row justify-content-center  mt-5">
                    <Link to="/enter" className="row justify-content-center  mt-5">
                        <button className="btn btn-dark" type="submit">Enter Game</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default StartScreen;