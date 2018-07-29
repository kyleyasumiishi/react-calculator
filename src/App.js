import React, { Component } from "react";
import "./css/App.css";
import NumbersContainer from "./js/containers/NumbersContainer";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return <NumbersContainer />;
  }
}

export default connect(
  null,
  null
)(App);
