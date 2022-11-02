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
import { useCallback } from "react";
import {logout, refresh} from "./services/authService";

const LOCAL_STORAGE_TOKEN_KEY = "jwt";

const WAIT_TIME = 15 * 60 * 1000;
const EMPTY_USER = {
  userId: 0,
  username: '',
  roles: []
};

function App() {

  const [user, setUser] = useState(EMPTY_USER);
  const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

  const refreshUser = useCallback(() =>{
    console.log("REFRESHING TOKEN!!!");
    refresh()
      .then(data =>{
        if(data.username){
          setUser(data);
          setTimeout(refreshUser, WAIT_TIME);
        } else{
          logout();
        }
      }).catch(blah => logout());
  }, []);

  const onAuthenticated = useCallback((authenticatedUser) => {
    setUser(authenticatedUser);
    setTimeout(refreshUser, WAIT_TIME)
  }, [refreshUser]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const auth = {
    user: user,
    onAuthenticated,
    logout() {
      logout();
      setUser(EMPTY_USER);
    },
    isAdmin(){
      return user.roles.includes('ADMIN');
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  //   if(token){
  //     login(token);
  //   }

  //   setRestoreLoginAttemptCompleted(true);
  // }, []);

  // const login = (token) => {
  //   localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

  //   const { sub: username, user_id: userId, role_id: role } = jwtDecode(token);

  //   let roleString = "NONE";
  //   if (role === 1) {
  //     roleString = "ADMIN"
  //   } else if (role === 2) {
  //     roleString = "USER"
  //   }

  //   const user = {
  //     userId,
  //     username,
  //     roleString,
  //     token
  //   };

  //   setUser(user);
  //   setTimeout(refreshUser, WAIT_TIME);

  //   return user;
  // };

  // const logout = () => {
  //   setUser(null);
  //   localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  // };

  // if (!restoreLoginAttemptCompleted) {
  //   return null;
  // }

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