import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ResourceButton from "./ResourceButton";

function ActionButtons3({updateResource}){
    const auth = useContext(AuthContext);

    function displayAdminButtons(){
        if(auth.user.username !== "admin"){
            return <></>;
        }
        
        return(
            <>
                <button className="btn btn-light mt-3" resourcename="cheese" amount="5" onClick={updateResource}>Admin Cheese</button>
                <button className="btn btn-light mt-3" resourcename="yogies" amount="5" onClick={updateResource}>Admin Yogies</button>
                <button className="btn btn-light mt-3" resourcename="minions" amount="1" onClick={updateResource}>Admin Minions</button>
            </>
        );
    }
    
    return(
        <>
            {displayAdminButtons()}
        </>
    )
}

export default ActionButtons3;