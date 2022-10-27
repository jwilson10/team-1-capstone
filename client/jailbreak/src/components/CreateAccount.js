import { Link } from "react-router-dom";
import {useState} from "react";
import {useHistory} from "react-router-dom";


function CreateAccount() {
    return (
        <>

        <div className="text-body text-lg-center" class="container">
        <h1 className=" d-flex align-items-center justify-content-center m-5">Create Account</h1>
        </div>
    
         <form>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-5">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
        <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/CreateAccount" className="row justify-content-center  mt-5 ">
                        <button className="btn btn-dark" type="submit">Create</button>
                    </Link>
             </div>
        </>
    )


}
export default CreateAccount;
