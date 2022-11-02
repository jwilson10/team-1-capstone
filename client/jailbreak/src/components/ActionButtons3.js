import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ResourceButton from "./ResourceButton";

function ActionButtons3({updateResource}){
    const auth = useContext(AuthContext);
    
    function cantBribe(){
        return !JSON.parse(localStorage.getItem("eventState")).canBribe;
    }

    function shouldBribeButtonBeDisabled(){
        const eventState = JSON.parse(localStorage.getItem("eventState"));

        const result = !eventState.canBribe || eventState.hasBribed;

        return result;
    }

    function displayAdminButtons(){
        if(auth.user.username !== "admin"){
            return <></>;
        }
        
        return(
            <>
                <button 
                    className="btn btn-light mt-3" 
                    craftingrecipe={
                        JSON.stringify({
                            crafted: "cheese",
                            amount: 1000,
                            costs: []
                        })
                    }
                    onClick={updateResource}>Admin Cheese</button>
                <button 
                    className="btn btn-light mt-3" 
                    craftingrecipe={
                        JSON.stringify({
                            crafted: "yogies",
                            amount: 1000,
                            costs: []
                        })
                    }
                    onClick={updateResource}>Admin Yogies</button>
                <button 
                    className="btn btn-light mt-3"
                    craftingrecipe={
                        JSON.stringify({
                            crafted: "minions",
                            amount: 1,
                            costs: [
                                {resource: "cheese", amount: 1},
                                {resource: "yogies", amount: 1}
                            ]
                        })
                    }     
                    onClick={updateResource}>Admin Minions</button>
            </>
        );
    }
    
    return(
        <>
            {displayAdminButtons()}
            {!cantBribe() && 
                <ResourceButton 
                    craftingRecipe={
                        JSON.stringify({
                            crafted: "old rat",
                            amount: 1,
                            costs: [
                                {resource: "cheese", amount: 1000},
                                {resource: "yogies", amount: 30}
                            ]
                        })
                    }
                    updateResource={updateResource} 
                    content="Bribe"
                    disabled={shouldBribeButtonBeDisabled()}></ResourceButton>
            }
        </>
    )
}

export default ActionButtons3;