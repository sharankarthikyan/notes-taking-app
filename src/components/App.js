import React from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import SignupComponent from "./SignupComponent/SignupComponent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeComponent from "./HomeComponent/HomeComponent";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={LoginComponent} />
            <Route path="/signup" exact component={SignupComponent} />
            <Route path="/home" exact component={HomeComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
