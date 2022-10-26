import HomeLogoutNavbar from "./HomeLogoutNavbar";
import "./GameScreenMain.css"
import ActionButtons1 from "./ActionButtons1";
import ResourceDisplay from "./ResourceDisplay";
import MessagesDisplay from "./MessagesDisplay";

function GameScreenMain(){
    return (
        <>
            <HomeLogoutNavbar></HomeLogoutNavbar>
            <div className="container-fluid toward-center">
                <div className="row more-columns">
                    <div className="col col-1"></div>
                    <div className="col col-10 game">
                        <div className="row">
                            <div className="col messages">
                                <MessagesDisplay></MessagesDisplay>
                            </div>
                            <div className="col col-9">
                                <div className="col">
                                    <div className="row container mt-4">
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Cage</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Room</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-secondary w-100">Outside</button>
                                        </div>
                                        <div className="col col-6">
                                        </div>
                                    </div>
                                    <div className="row container mt-4">
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Basic</h6>
                                                    <ActionButtons1></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Craft</h6>
                                                    <ActionButtons1></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col action">
                                            {/* Card */}
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Trade</h6>
                                                    <ActionButtons1></ActionButtons1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 resources">
                                            <div className="card action-card">
                                                <div className="card-body d-flex flex-column">
                                                    <h6 className="card-title">Resources</h6>
                                                    <ResourceDisplay></ResourceDisplay>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row container mt-4">
                                        <div className="col-9">
                                        </div>
                                        <div className="col-3">
                                            <button className="btn btn-success w-100">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-1"></div>
                </div>
            </div>
        </>
    )
}

export default GameScreenMain;