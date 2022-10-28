function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const games = [
    {
        "gameId": 1,
        "userId": 1,
        "characterName": "Ethan",
        "gameNumber": 1,
        "inventorySlotList": [
          {
            "slotId": 2,
            "gameId": 2,
            "resourceId": 1,
            "quantity": 10
          }
        ]
    },
    {
        "gameId": 2,
        "userId": 1,
        "characterName": "Jessica",
        "gameNumber": 2,
        "inventorySlotList": [
          {
            "slotId": 2,
            "gameId": 2,
            "resourceId": 2,
            "quantity": 23
          }
        ]
    },
    {
        "gameId": 3,
        "userId": 1,
        "characterName": "Cruz",
        "gameNumber": 3,
        "inventorySlotList": [
          {
            "slotId": 2,
            "gameId": 2,
            "resourceId": 2,
            "quantity": 678
          }
        ]
    },
];

//get all games for all users
export async function findAllForUser(){
    console.log("In Find Games");

    await delay(1500);

    return {
        otherStuff: "Blah blah blah",
        games: games
    };
}

//get specific game


//create game


//update game


//delete game
export async function deleteGame(gameNumber){
    console.log("In Delete");

    await delay(1500);

    let toDelete = games.find((game) => game && game.gameNumber === gameNumber);
    if(toDelete){
        games[games.indexOf(toDelete)] = undefined;
    }
}
