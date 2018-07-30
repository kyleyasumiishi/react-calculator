import React, { Component } from "react";
import Button from "../components/Button";
import { connect } from "react-redux";
import { BUTTONS } from "../../constants";
import { clickOperator } from "../actions/actions";

export class OperatorsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const operator = e.target.textContent;
    console.log(operator);
    this.props.clickOperator(operator);
  }

  render() {
    const operatorButtons = BUTTONS.operators.map(operator => {
      return (
        <Button
          className={operator.id + "-container"}
          id={operator.id}
          onClick={this.handleClick}
          text={operator.text}
        />
      );
    });

    return operatorButtons;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickOperator: operator => {
      dispatch(clickOperator(operator));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(OperatorsContainer);
