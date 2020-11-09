import React, { Component } from "react";
import HomeMenuComponent from "../HomeMenuComponent/HomeMenuComponent";
import MainHomeComponent from "../MainHomeComponent/MainHomeComponent";

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <HomeMenuComponent />
        <MainHomeComponent />
      </div>
    );
  }
}

export default HomeComponent;
