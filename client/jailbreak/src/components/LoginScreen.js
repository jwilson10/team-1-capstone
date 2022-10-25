function Login() {
    return (
        <>

        <div className="text-body text-lg-center" class="container">
        <h1 className=" d-flex align-items-center justify-content-center m-5">Log in</h1>
        </div>
        <div className="container">
        </div>
         <form>
             <div className="form-group">
                 <label htmlFor="username" className="form-label"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
             <div className="form-group">
                 <label htmlFor="password" className="form-label">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
             <div>
                 <button className="btn btn-primary me-2" type="submit">Login</button>    
             </div>
    
        </>
    )


}
export default Login;