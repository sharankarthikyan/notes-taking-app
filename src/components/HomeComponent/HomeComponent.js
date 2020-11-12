import React, { Component } from "react";
import HomeMenuComponent from "../HomeMenuComponent/HomeMenuComponent";
import MainHomeComponent from "../MainHomeComponent/MainHomeComponent";
import firebase from "firebase";
import Spinner from "../../UI/Spinner/Spinner";

class HomeComponent extends Component {
  state = {
    userinfo: "",
    userError: false,
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userinfo: user.uid });
      } else {
        this.setState({ userError: true });
        console.log("There is no logged in user");
      }
    });
  }
  render() {
    if (!this.state.userError && this.state.userinfo) {
      return (
        <div>
          <HomeMenuComponent />
          <MainHomeComponent />
        </div>
      );
    } else if (this.state.userError) {
      return (
        <Spinner message="Something went Wrong, Maybe your login session is expired :(" />
      );
    } else {
      return <Spinner />;
    }
  }
}

export default HomeComponent;
