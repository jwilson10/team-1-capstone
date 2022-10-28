import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {useHistory} from "react-router-dom";

function HomeLogoutNavbar(){
    const auth = useContext(AuthContext);

    const history = useHistory();

    function handleLogout(){
        auth.logout();
        history.push("/");
    }

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
                        <div className="text-light">
                            Logged in as: {auth.user.username}
                        </div>
                    )}

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default HomeLogoutNavbar;