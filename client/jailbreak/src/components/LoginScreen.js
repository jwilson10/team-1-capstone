function Login() {

    return (
        <>

        <div >
        <h1 className=" d-flex align-items-center justify-content-center m-5">Log in</h1>
        </div>
        <div className="container">
        </div>
         <form>
         <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-3">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <button className="btn btn-primary  m-5" type="submit" data-bs-toggle="button" autocomplete="off">Login</button>    
             </div>
    
        </>
    )


}
export default Login;