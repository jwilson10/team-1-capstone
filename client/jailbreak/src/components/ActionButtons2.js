import ResourceButton from "./ResourceButton";

function ActionButtons2({updateResource}){
    return(
        <>
            <ResourceButton resourceName="minions" amount="5" updateResource={updateResource} content="Gather Minions"></ResourceButton>
        </>
    )
}

export default ActionButtons2;