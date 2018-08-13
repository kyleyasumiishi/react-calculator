import React, { Component } from "react";
import "./css/App.css";
import { connect } from "react-redux";

// Import containers
// import NumbersContainer from "./js/containers/NumbersContainer";
import DisplayContainer from "./js/containers/DisplayContainer";
// import OperatorsContainer from "./js/containers/OperatorsContainer";
// import DecimalContainer from "./js/containers/DecimalContainer";
import ButtonsContainer from "./js/containers/ButtonsContainer";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="grid-container">
          <DisplayContainer />
          <ButtonsContainer />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(App);
