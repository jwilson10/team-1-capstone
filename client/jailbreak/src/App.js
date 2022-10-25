import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import React from 'react';
import LoginScreen from "./components/LoginScreen";
import CreateAccount from "./components/CreateAccount";
import StartScreen from "./components/StartScreen";

function App() {
  return (

    <Router>
      <Switch>
        <Route>
          <StartScreen />
        </Route>
        <Route>
          <LoginScreen />
        </Route>
        <Route>
          <CreateAccount />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
