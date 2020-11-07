import React from "react";
import MenuComponent from "./MenuComponent/MenuComponent";
import LoginComponent from "./LoginComponent/LoginComponent";
import SignupComponent from "./SignupComponent/SignupComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <MenuComponent />
        <Switch>
          <Route path="/" exact component={LoginComponent} />
          <Route path="/signup" exact component={SignupComponent} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
