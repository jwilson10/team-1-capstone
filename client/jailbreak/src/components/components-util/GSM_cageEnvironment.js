import ActionButtons1 from "../ActionButtons1";
import ActionButtons2 from "../ActionButtons2";
import ActionButtons3 from "../ActionButtons3";

function GSM_cageEnvironment({updateResource, triggerEvent, stateForUpdate}){
    return(
        <>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-title">Basic</h6>
                        <ActionButtons1 updateResource={updateResource} triggerEvent={triggerEvent}></ActionButtons1>
                    </div>
                </div>
            </div>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-title">Craft</h6>
                        <ActionButtons2 updateResource={updateResource} stateForUpdate={stateForUpdate}></ActionButtons2>
                    </div>
                </div>
            </div>
            <div className="col action">
                {/* Card */}
                <div className="card action-card">
                    <div className="card-body d-flex flex-column">
                        <h6 className="card-title">Trade</h6>
                        <ActionButtons3 updateResource={updateResource}></ActionButtons3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GSM_cageEnvironment;