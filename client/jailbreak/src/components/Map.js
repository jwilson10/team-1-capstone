
function Map(){

    let mapArr = new Array(10);

    mapArr.push("#".repeat(60));
    function generateMap(){
        for (let i = 0; i < 15; i++) {
        let newArr = new Array;
            for(let j = 0; j < 60; j++){
                newArr.push(" . ");                
            }
        mapArr.push(newArr);
        }
    }

    generateMap();

    return(<div> 
        <h1>A map will go here</h1>
        <div>{mapArr.map(row => <div class="d-grid gap-2 col-6 mx-auto">{row}</div>)}</div>
        </div>);
}

export default Map;