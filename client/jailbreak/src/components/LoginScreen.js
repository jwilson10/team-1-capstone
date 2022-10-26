function Login() {

    return (
        <>

        <div >
        <h1 className=" d-flex align-items-center justify-content-center m-5">Log in</h1>
        </div>
        <div className="container">
        </div>
         <form className="d-flex align-items-center justify-content-center m-5">
             <div className="form-group">
                 <label htmlFor="username" className="form-label"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
            
             <div className="form-group">
                 <label htmlFor="password" className="form-label">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <button className="btn btn-primary  " type="submit" data-bs-toggle="button" autocomplete="off">Login</button>    
             </div>
    
        </>
    )


}
export default Login;