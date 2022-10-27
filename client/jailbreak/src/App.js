import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React, { useState } from 'react';
import StartScreen from "./components/StartScreen";
import LoginScreen from "./components/LoginScreen";
import CreateAccount from "./components/CreateAccount";
import CreateGame from "./components/CreateGame";
import DisplayGames from "./components/DisplayGames";
import GameScreenMain from "./components/GameScreenMain";
import AuthContext from "./context/AuthContext";
import jwtDecode from "jwt-decode";
     
function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    const { sub: username, role_id: role } = jwtDecode(token);
  
    const roleString = "NONE";
    if(role === 1){
      roleString = "ADMIN"
    }else if(role === 2){
      roleString = "USER"
    }

    const user = {
      username,
      roleString,
      token
    };
  
    console.log(user);
  
    setUser(user);
  
    return user;
  };
    
  const logout = () => {
    setUser(null);
  };
  
  const auth = {
    user: user ? {...user} : null,
    login,
    logout
  };  

  return (
    <AuthContext.Provider value={auth}>
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
          <Route path="/game">
            <GameScreenMain />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;