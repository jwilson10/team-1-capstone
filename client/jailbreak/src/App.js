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
        <Route exact path="/">
          <StartScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/create-game">
          <CreateGame />
        </Route>
        <Route path="/all-games">
          <DisplayGames />
        </Route>
        <Route path="/game">
          <GameScreenMain />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
