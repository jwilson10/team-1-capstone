import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Error from "./Error";
import AuthContext from "../context/AuthContext";

//Dummy commit message
//Dummy commit message, but again though
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    
    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/authenticate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
    },

    body: JSON.stringify({
        username,
        password,
    }),
});

if (response.status === 200) {
    const { jwt_token } = await response.json();

    auth.login(jwt_token);
    history.push("/all-games");
  } else if (response.status === 403) {
    setErrors(["Login failed."]);
  } else {
    setErrors(["Unknown error."]);
  }
};

  return (
    <>
    <div>
    {errors.map((error, i) => (
    <Error key={i} msg={error} />
    ))}
    <h1 className=" d-flex align-items-center justify-content-center m-5">Log in</h1>
    </div>
    <div className="container">
    </div>
    <form onSubmit={handleSubmit}>
    <div className="d-grid gap-2 col-6 mx-auto">
            <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center"> Enter Username</label>
            <input type="text" className="form-control" onChange={(event) => setUsername(event.target.value)} id="username"></input>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
            <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-3">Enter Password</label>
            <input type="text" className="form-control" id="password" name="password" onChange={(event) => setPassword(event.target.value)}></input>
        </div><div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-dark m-5" type="submit">Login</button>
        </div>
    </form>
    <div>
      <Link to="/create-account"><h6 className=" d-flex align-items-center justify-content-center m-5">Don't have an account? Create one</h6></Link>
    </div>  
    </>
  )
}
export default Login;

