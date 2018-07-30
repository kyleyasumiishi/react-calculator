import React, { Component } from "react";
import "./css/App.css";
import { connect } from "react-redux";

// Import containers
import NumbersContainer from "./js/containers/NumbersContainer";
import DisplayContainer from "./js/containers/DisplayContainer";
import OperatorsContainer from "./js/containers/OperatorsContainer";
import DecimalContainer from "./js/containers/DecimalContainer";

class App extends Component {
  render() {
    return (
      <div>
        <DisplayContainer />
        <NumbersContainer />
        <OperatorsContainer />
        <DecimalContainer />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
