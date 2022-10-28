function ActionButtons1({updateResource}){
    return(
        <>
            <button className="btn btn-light mt-3" resourcename="cheese" amount="5" onClick={updateResource}>Gather Cheese</button>
            <button className="btn btn-light mt-3" resourcename="exercise" amount="5" onClick={updateResource}>Run</button>
            <button className="btn btn-light mt-3" resourcename="cheese" amount="5" onClick={updateResource}>Gather Cheese</button>
            <button className="btn btn-light mt-3" resourcename="exercise" amount="5" onClick={updateResource}>Run</button>
            <button className="btn btn-light mt-3" resourcename="energy" amount="5" onClick={updateResource}>Sleep</button>
        </>
    )
}

export default ActionButtons1;