import React, { Component } from "react";
import Button from "../components/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BUTTONS } from "../../constants";
// import actions

export class NumbersContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const numberButtons = BUTTONS.numbers.map(number => {
      return (
        <Button
          className={number + "-container"}
          id={number}
          onClick={console.log("Test")}
        />
      );
    });

    return numberButtons;
  }
}

// function mapStateToProps(state) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return ();
// }

export default connect(
  null,
  null
)(NumbersContainer);
