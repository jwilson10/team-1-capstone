import ResourceButton from "./ResourceButton";

function ActionButtons1({updateResource}){
    return(
        <>
            <ResourceButton resourceName="cheese" amount="5" updateResource={updateResource} content="Gather Cheese"></ResourceButton>
            <ResourceButton resourceName="yogies" amount="1" updateResource={updateResource} content="Gather Yogies"></ResourceButton>
        </>
    )
}

export default ActionButtons1;