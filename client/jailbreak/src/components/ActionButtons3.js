import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ResourceButton from "./ResourceButton";

function ActionButtons3({updateResource}){
    const auth = useContext(AuthContext);
    
    function cantBribe(){
        return !JSON.parse(localStorage.getItem("eventState")).canBribe;
    }

    function hasBribed(){
        return !JSON.parse(localStorage.getItem("eventState")).hasBribed;
    }

    function displayAdminButtons(){
        if(auth.user.username !== "admin"){
            return <></>;
        }
        
        return(
            <>
                <button 
                    className="btn btn-light mt-3" 
                    craftingRecipe={
                        JSON.stringify({
                            crafted: "cheese",
                            amount: 1000,
                            costs: []
                        })
                    }
                    onClick={updateResource}>Admin Cheese</button>
                <button 
                    className="btn btn-light mt-3" 
                    craftingRecipe={
                        JSON.stringify({
                            crafted: "yogies",
                            amount: 1000,
                            costs: []
                        })
                    }
                    onClick={updateResource}>Admin Yogies</button>
                <button 
                    className="btn btn-light mt-3"
                    craftingRecipe={
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
                                {resource: "yogies", amount: 50}
                            ]
                        })
                    }
                    updateResource={updateResource} 
                    content="Bribe"
                    disabled={cantBribe() && !hasBribed()}></ResourceButton>
            }
        </>
    )
}

export default ActionButtons3;