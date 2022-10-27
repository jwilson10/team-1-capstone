import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React, { useState, useEffect } from 'react';
import StartScreen from "./components/StartScreen";
import LoginScreen from "./components/LoginScreen";
import CreateAccount from "./components/CreateAccount";
import CreateGame from "./components/CreateGame";
import DisplayGames from "./components/DisplayGames";
import GameScreenMain from "./components/GameScreenMain";
import Error from "./components/Error";
import AuthContext from "./context/AuthContext";
import jwtDecode from "jwt-decode";
     

/*
  At the beginning of the login function, store the token parameter in localStorage using the localStorage.setItem method.

  At the end of the logout function, remove the token from localStorage using the localStorage.removeItem method.

  Add an if statement right before the main return to return null if the restoreLoginAttemptCompleted state variable is false. This prevents any of the application routes from rendering until the useEffect hook callback function that's responsible for attempting to restore the user's login state has had a chance to completely execute.

*/

const LOCAL_STORAGE_TOKEN_KEY = "jailbreakToken";

function App() {
  const [user, setUser] = useState(null);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if(token){
      login(token);
    }

    setRestoreLoginAttemptCompleted(true);
  }, []);

  const login = (token) => {
    console.log("Should log in!");

    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

    const { sub: username, role_id: role } = jwtDecode(token);

    let roleString = "NONE";
    if (role === 1) {
      roleString = "ADMIN"
    } else if (role === 2) {
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
    console.log("Should log out!");

    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  if (!restoreLoginAttemptCompleted) {
    return null;
  }

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