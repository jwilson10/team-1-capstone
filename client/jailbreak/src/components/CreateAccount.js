import {Link} from "react-router-dom";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import Error from "./Error";

function CreateAccount() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:8080/create_account", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
    },

    body: JSON.stringify({
        username,
        password,
    }),
});

if (response.status === 201) {
    const { jwt_token } = 
    await response.json();
        
    history.push("/login");
  } else if (response.status === 403) {
    setErrors(["Login failed."]);
  } else {
    const result = await response.json();
    console.log(result);
    setErrors(result);
  }

  
};
    return (
        <>
        <div className="text-body text-lg-center">
        <h1 className=" d-flex align-items-center justify-content-center m-5">Register Account</h1>
        </div>    
         <form onSubmit={handleSubmit}>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center m-3"> Enter Username</label>
                 <input type="text" className="form-control" onChange={(event) => setUsername(event.target.value)} id="username"></input>
             </div>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-3">Enter Password</label>
                 <input type="password" className="form-control" id="password" name="password" onChange={(event) => setPassword(event.target.value)}></input>
             </div>
        <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-dark m-5" type="submit">Sign Up</button>
        </div>
        <div>
        {errors.map((error, i) => (
        <Error key={i} msg={error} />
        ))}
        </div>
        </form>
        </>
    );
}
export default CreateAccount;
