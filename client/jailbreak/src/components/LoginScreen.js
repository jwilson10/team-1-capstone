import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Error from "./Error";
import AuthContext from "../context/AuthContext";
import { authenticate } from "../services/authService";
import "./LoginScreen.css";

//Dummy commit message
//Dummy commit message, but again though
function Login() {

    const [credentials, setCredentials] = useState({
      username: '',
      password: ''
    });
    const [errors, setErrors] = useState([]);
    
    const auth = useContext(AuthContext);

    const history = useHistory();

const handleSubmit = async (event) => {
  event.preventDefault();
  authenticate(credentials)
    .then(data => {
      if(data.username){
        auth.onAuthenticated(data);
        history.push("/all-games");
      } else{
        setErrors(data);
      }
    })
    .catch(console.error);
};

const handleChange = (evt) => {
  const nextCredentials = {...credentials};
  nextCredentials[evt.target.name] = evt.target.value;
  setCredentials(nextCredentials);
};
//         event.preventDefault();
//         const response = await fetch("http://localhost:8080/authenticate", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//         username,
//         password,
//     }),
// });
// if (response.status === 200) {
//     const { jwt_token } = await response.json();

//     auth.login(jwt_token);
//     history.push("/all-games");
//   } else if (response.status === 403) {
//     setErrors(["Login failed."]);
//   } else {
//     const result = await response.json();
//     console.log(result);
//     setErrors(result);  }

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
            <input name="username" type="text" className="form-control" onChange={handleChange} id="username"></input>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
            <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-3">Enter Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange}></input>
        </div><div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-dark m-5" type="submit">Login</button>
        </div>
    </form>
    <div>
      <Link to="/create-account"><h5 className=" d-flex align-items-center justify-content-center m-2 create-account">Don't have an account? Create one</h5></Link>
    </div>  
    </>
  )
}
export default Login;

