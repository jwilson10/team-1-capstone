import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React from 'react';
import LoginScreen from "./components/LoginScreen";
import CreateAccount from "./components/CreateAccount";
import StartScreen from "./components/StartScreen";
import CreateGame from "./components/CreateGame";
import DisplayGames from "./components/DisplayGames";
import GameScreenMain from "./components/GameScreenMain";

function App() {
  return (

    <Router>
      <Switch>
        {/* <Route>
          <StartScreen />
        </Route> */}
        <Route>
          <LoginScreen />
        </Route> 
        {/* <Route>
          <CreateAccount />
        </Route> */}
        {/* <Route>
          <CreateGame />
        </Route>
        <Route>
          <DisplayGames />
        </Route>
        <Route>
          <GameScreenMain />
        </Route> */}
      </Switch>
    </Router>
  );
}
export default App;
