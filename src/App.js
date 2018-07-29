import React, { Component } from "react";
import "./css/App.css";
import NumbersContainer from "./js/containers/NumbersContainer";
import DisplayContainer from "./js/containers/DisplayContainer";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <DisplayContainer />
        <NumbersContainer />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
