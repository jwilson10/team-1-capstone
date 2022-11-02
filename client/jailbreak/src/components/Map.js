import "./Map.css";

function Map(){

    let mapArr = new Array(10);

    mapArr.push("#".repeat(60));
    function generateMap(){
        for (let i = 0; i < 15; i++) {
        let newArr = new Array;
            for(let j = 0; j < 60; j++){
                if(j == 0 || j == 59){
                    newArr.push("#");
                } else {
                    newArr.push(".");
                }                
            }
        mapArr.push(newArr);
        }
    }

    generateMap();
    mapArr.push("#".repeat(60));

    return(
        <div>
        <div className="d align-items-center"> 
        <h1>A map will go here</h1>
        <div className="align-self-center map">{mapArr.map(row => <div className="row"><div className="map">{row}</div></div>)}</div>
        </div>
        </div>);
}

export default Map;