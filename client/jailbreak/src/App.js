import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React from 'react';
import StartScreen from "./components/StartScreen";
import LoginScreen from "./components/LoginScreen";
import CreateAccount from "./components/CreateAccount";
import CreateGame from "./components/CreateGame";
import DisplayGames from "./components/DisplayGames";
import GameScreenMain from "./components/GameScreenMain";
import Error from "./components/Error";
     
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <StartScreen />
        </Route>
        <Route exact path="/login">
          <LoginScreen />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/create-game">
          <CreateGame />
        </Route>
        <Route path="/all-games">
          <DisplayGames />
        </Route>
        <Route path="/error">
          <Error />
        </Route>
        <Route path="/game">
          <GameScreenMain />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;