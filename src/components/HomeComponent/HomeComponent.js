import React, { Component } from "react";
import HomeMenuComponent from "../HomeMenuComponent/HomeMenuComponent";
import MainHomeComponent from "../MainHomeComponent/MainHomeComponent";
import firebase from "firebase";
import Spinner from "../../UI/Spinner/Spinner";

class HomeComponent extends Component {
  state = {
    userId: "",
    userError: false,
  };

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userId: user.uid });
      } else {
        this.setState({ userError: true });
      }
    });
  }
  render() {
    if (!this.state.userError && this.state.userId) {
      return (
        <div>
          <HomeMenuComponent />
          <MainHomeComponent userId={this.state.userId} />
        </div>
      );
    } else if (this.state.userError) {
      return (
        <Spinner message="Something went Wrong, Maybe your login session expired :(" />
      );
    } else {
      return <Spinner />;
    }
  }
}

export default HomeComponent;
