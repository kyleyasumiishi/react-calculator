import React, { Component } from "react";
import "./css/App.css";
import { connect } from "react-redux";

// Import containers
import NumbersContainer from "./js/containers/NumbersContainer";
import DisplayContainer from "./js/containers/DisplayContainer";
import OperatorsContainer from "./js/containers/OperatorsContainer";

class App extends Component {
  render() {
    return (
      <div>
        <DisplayContainer />
        <NumbersContainer />
        <OperatorsContainer />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
