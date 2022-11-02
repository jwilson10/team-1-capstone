import { useEffect } from "react";
import ActionButtons4 from "../ActionButtons4";

function GSM_roomEnvironment({updateResource, triggerEvent, stateForUpdate}){
    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("eventState")).outsideOpenedUp){
            triggerEvent("enter_room");
        }
    }, [stateForUpdate]);

    return(
        <>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        {/* <h6 className="card-title">Basic</h6> */}
                        {/* <ActionButtons4 updateResource={updateResource} triggerEvent={triggerEvent}></ActionButtons4> */}
                    </div>
                </div>
            </div>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        {/* <h6 className="card-title">Craft</h6> */}
                    </div>
                </div>
            </div>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        {/* <h6 className="card-title">Trade</h6> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default GSM_roomEnvironment;