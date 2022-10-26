function CreateAccount() {
    return (
        <>

        <div className="text-body text-lg-center" class="container">
        <h1 className=" d-flex align-items-center justify-content-center m-5">Create Account</h1>
        </div>
        <div className="container">
        </div>
         <form>
             <div className="form-group">
                <div className="d-flex align-items-center justify-content-center m-5">
                </div>

                 <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center m-5"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
             <div className="form-group">
                 <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-5">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
             <div>
                 <button className="btn btn-primary m-5 t-5 " type="submit">Login</button>    
             </div>
        </>
    )


}
export default CreateAccount;
