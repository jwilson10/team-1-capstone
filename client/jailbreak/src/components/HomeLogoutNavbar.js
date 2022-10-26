function HomeLogoutNavbar(){
    return (
        <>
            <nav className="navbar navbar-expand bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-primary">Home</button>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-danger">Log Out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default HomeLogoutNavbar;