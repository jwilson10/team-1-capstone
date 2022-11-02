import { useEffect } from "react";
import ActionButtons1 from "../ActionButtons1";

function GSM_outsideEnvironment({updateResource, triggerEvent, stateForUpdate}){
    useEffect(() => {
        triggerEvent("escape");
    }, [stateForUpdate]);

    return(
        <>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        {/* <h6 className="card-title">Basic</h6>
                        <ActionButtons1 updateResource={updateResource} triggerEvent={triggerEvent}></ActionButtons1> */}
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

export default GSM_outsideEnvironment;