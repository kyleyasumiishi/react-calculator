import React, { Component } from "react";
import Button from "../components/Button";
import { connect } from "react-redux";
import { BUTTONS } from "../../constants";
import { clickDecimal } from "../actions/actions";

export class DecimalContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const decimal = e.target.textContent;
    console.log(decimal);
    this.props.clickDecimal(decimal);
  }

  render() {
    const decimal = BUTTONS.decimal;
    return (
      <Button
        className={decimal.id + "-container"}
        id={decimal.id}
        onClick={this.handleClick}
        text={decimal.text}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickDecimal: decimal => {
      dispatch(clickDecimal(decimal));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(DecimalContainer);
