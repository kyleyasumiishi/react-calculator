import React, { Component } from "react";
import Button from "../components/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BUTTONS } from "../../constants";
import * as actions from "../actions/actions";

export class NumbersContainer extends Component {
  constructor(props) {
    super(props);
    this.clickNumber = this.clickNumber.bind(this);
    this.clickOperator = this.clickOperator.bind(this);
    this.clickDecimal = this.clickDecimal.bind(this);
    this.clickClear = this.clickClear.bind(this);
    this.clickEquals = this.clickEquals.bind(this);
    this.clickNegate = this.clickNegate.bind(this);
    this.clickPercent = this.clickPercent.bind(this);
    this.getClickStyle = this.getClickStyle.bind(this);
    this.styleOperator = this.styleOperator.bind(this);
    this.clearOperatorStyles = this.clearOperatorStyles.bind(this);
  }

  getClickStyle(e) {
    this.clearOperatorStyles();
    const bg = window.getComputedStyle(e.target).backgroundColor;
    e.target.style.backgroundColor = "#bcbaba";
    setTimeout(
      target => {
        target.style.backgroundColor = bg;
      },
      100,
      e.target
    );
  }

  clearOperatorStyles() {
    const defaultOperatorStyles = window.getComputedStyle(
      document.getElementById("equals")
    );
    const operators = BUTTONS.operators.map(operator => {
      return operator.id;
    });
    operators.forEach(id => {
      const element = document.getElementById(id);
      element.style.backgroundColor = defaultOperatorStyles.backgroundColor;
      element.style.color = defaultOperatorStyles.color;
    });
  }

  styleOperator(e) {
    this.clearOperatorStyles();

    e.target.style.backgroundColor = "#fcf1cf";
    setTimeout(
      target => {
        target.style.backgroundColor = "white";
        target.style.color = "#ff940e";
      },
      250,
      e.target
    );
  }

  clickNumber(e) {
    const number = e.target.textContent;
    console.log(number);
    this.getClickStyle(e);
    this.props.clickNumber(number);
  }

  clickOperator(e) {
    const operator = e.target.textContent;
    console.log(operator);
    this.styleOperator(e);
    this.props.clickOperator(operator);
  }

  clickDecimal(e) {
    const decimal = e.target.textContent;
    console.log(decimal);
    this.getClickStyle(e);
    this.props.clickDecimal(decimal);
  }

  clickClear(e) {
    this.getClickStyle(e);
    this.props.clickClear();
  }

  clickEquals(e) {
    this.getClickStyle(e);
    this.props.clickEquals();
  }

  clickNegate(e) {
    this.getClickStyle(e);
    this.props.clickNegate();
  }

  clickPercent(e) {
    this.getClickStyle(e);
    this.props.clickPercent();
  }

  render() {
    const numberButtons = BUTTONS.numbers.map(number => {
      return (
        <Button
          className={number.id + "-container"}
          id={number.id}
          onClick={this.clickNumber}
          text={number.text}
        />
      );
    });

    const operatorButtons = BUTTONS.operators.map(operator => {
      return (
        <Button
          className={operator.id + "-container"}
          id={operator.id}
          onClick={this.clickOperator}
          text={operator.text}
        />
      );
    });

    const decimalButton = (
      <Button
        className={BUTTONS.decimal.id + "-container"}
        id={BUTTONS.decimal.id}
        onClick={this.clickDecimal}
        text={BUTTONS.decimal.text}
      />
    );

    const clearButton = (
      <Button
        className={BUTTONS.clear.id + "-container"}
        id={BUTTONS.clear.id}
        onClick={this.clickClear}
        text={BUTTONS.clear.text}
      />
    );

    const equalsButton = (
      <Button
        className={BUTTONS.equals.id + "-container"}
        id={BUTTONS.equals.id}
        onClick={this.clickEquals}
        text={BUTTONS.equals.text}
      />
    );

    const negateButton = (
      <Button
        className={BUTTONS.negate.id + "-container"}
        id={BUTTONS.negate.id}
        onClick={this.clickNegate}
        text={BUTTONS.negate.text}
      />
    );

    const percentButton = (
      <Button
        className={BUTTONS.percent.id + "-container"}
        id={BUTTONS.percent.id}
        onClick={this.clickPercent}
        text={BUTTONS.percent.text}
      />
    );

    return (
      <div className="button-container">
        {numberButtons}
        {operatorButtons}
        {decimalButton}
        {clearButton}
        {equalsButton}
        {negateButton}
        {percentButton}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      clickNumber: actions.clickNumber,
      clickOperator: actions.clickOperator,
      clickDecimal: actions.clickDecimal,
      clickClear: actions.clickClear,
      clickEquals: actions.clickEquals,
      clickNegate: actions.clickNegate,
      clickPercent: actions.clickPercent
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(NumbersContainer);
