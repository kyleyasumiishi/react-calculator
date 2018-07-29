import React, { Component } from "react";
import Button from "../components/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import actions

export class NumbersContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const numbers = this.props.buttons.numbers;
    const numberButtons = numbers.map(number => {
      return (
        <Button
          className={number + "-container"}
          id={number}
          onClick={console.log("Test")}
        />
      );
    });
    // console.log(numbers);

    return numberButtons;
  }
}

function mapStateToProps(state) {
  return {
    buttons: state.buttons
  };
}

// function mapDispatchToProps(dispatch) {
//   return ();
// }

export default connect(
  mapStateToProps,
  null
)(NumbersContainer);
