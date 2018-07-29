import React, { Component } from "react";
import Button from "../components/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BUTTONS } from "../../constants";
import { clickNumber } from "../actions/actions";

export class NumbersContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const number = e.target.textContent;
    console.log(number);
    this.props.clickNumber(number);
  }

  render() {
    const numberButtons = BUTTONS.numbers.map(number => {
      return (
        <Button
          className={number.id + "-container"}
          id={number.id}
          onClick={this.handleClick}
          text={number.text}
        />
      );
    });

    return numberButtons;
  }
}

// function mapStateToProps(state) {
//   return {};
// }

function mapDispatchToProps(dispatch) {
  return {
    clickNumber: number => {
      dispatch(clickNumber(number));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NumbersContainer);
