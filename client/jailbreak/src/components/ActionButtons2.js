function ActionButtons2({updateResource}){
    return(
        <>
            <button className="btn btn-light mt-3" resourcename="cheese" amount="5" onClick={updateResource}>Gather Cheese</button>
        </>
    )
}

export default ActionButtons2;