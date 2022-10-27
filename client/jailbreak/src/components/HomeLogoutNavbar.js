import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function HomeLogoutNavbar(){
    const auth = useContext(AuthContext);

    return (
        <>
            <nav className="navbar navbar-expand bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="btn btn-primary" to="/">Home</Link>
                        </li>
                    </ul>

                    {auth.user && (
                        <div>
                            Welcome {auth.user.username}!
                            <button onClick={() => auth.logout()}>Logout</button>
                        </div>
                    )}
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-danger">Log Out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default HomeLogoutNavbar;