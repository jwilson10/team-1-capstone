function StartScreen() {

    return (
        <>

        <div>
        <h1 className=" d-flex align-items-center justify-content-center m-5">Create Account</h1>
        </div>
        <div className="container">
        </div>
         <form  className="d-flex align-items-center justify-content-center m-5">
             <div className="form-group">

                 <label htmlFor="username" className="form-label d-flex align-items-center justify-content-center m-5"> Enter Username</label>
                 <input type="text" className="form-control" id="username" name="username"></input>
             </div>
             <div className="form-group">
                 <label htmlFor="password" className="form-label d-flex align-items-center justify-content-center m-5">Enter Password</label>
                 <input type="text" className="form-control" id="password" name="password"></input>
             </div>
        </form>
             <div className="d-grid gap-2 col-6 mx-auto">
                 <button className="btn btn-primary"  data-bs-toggle="button" autocomplete="off" type="submit">Login</button>    
             </div>
        </>
    )







    // return(
    //     <>
    //     <div>
        
    //         <div className="">
    //             <h1 className=" d-flex align-items-center justify-content-center m-5" >J A I L B R E A K</h1>
    //         </div>
    //         <div className="row justify-content-center  mt-5">
    //         <button class="btn btn-dark" type="submit">Enter Game</button>
    //         </div>
    //     </div>
    //     </>
    // )

}
export default StartScreen;