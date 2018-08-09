import * as types from "../../constants";

const OPERATORS = types.BUTTONS.operators.map(operator => {
  return operator.text;
});

const initialState = {
  current: "",
  previous: "",
  display: "0"
};

const expressionReducer = (state = initialState, action) => {
  const lastCharIdx = state.current.length - 1;
  const lastChar = state.current.charAt(lastCharIdx);
  let divisor = 1;
  let multiplier = 1;
  let newCurrent;

  switch (action.type) {
    case types.NUMBER:
      newCurrent = state.current + action.number;
      return {
        current: newCurrent,
        previous: state.previous,
        display: getDisplay(newCurrent)
      };
    case types.OPERATOR:
      if (state.current === "" && state.previous === "") {
        return state;
      }
      newCurrent =
        state.current === ""
          ? state.previous + action.operator
          : OPERATORS.includes(lastChar)
            ? state.current.slice(0, lastCharIdx) + action.operator
            : state.current + action.operator;
      return {
        current: newCurrent,
        previous: state.previous,
        display: getDisplay(newCurrent)
      };
    case types.CLEAR:
      return initialState;
    case types.NEGATE:
      multiplier = -1;
      return evaluateExpression(state, multiplier, divisor);
    case types.PERCENT:
      divisor = 100;
      return evaluateExpression(state, multiplier, divisor);
    case types.EQUALS:
      return evaluateExpression(state, multiplier, divisor);
    case types.DECIMAL:
      let lastNum = getLastNum(state.current);
      if (lastNum.includes(".")) {
        return state;
      }
      newCurrent = endsWithOperator(state.current)
        ? state.current + "0."
        : state.current === ""
          ? "0."
          : state.current + ".";
      return {
        current: newCurrent,
        previous: state.previous,
        display: getDisplay(newCurrent)
      };

    default:
      return state;
  }
};

/////////////////////////////////////////////////////////

// Helper functions

/*
 * Returns a string of the last consecutive numbers in the input string.
 * @param {String}
 * @returns {String}
 */
function getLastNum(str) {
  const startIdx = endsWithOperator(str) ? str.length - 2 : str.length - 1;
  let lastNum = "";
  let isNum = true;
  while (isNum) {
    for (let i = startIdx; i >= 0; i--) {
      const character = str[i];
      if (OPERATORS.includes(character)) {
        isNum = false;
        break;
      } else {
        lastNum = character + lastNum;
      }
    }
    break;
  }
  return lastNum;
}

/*
 * Returns true if input string ends with an operator.
 */
function endsWithOperator(str) {
  return str.length > 0
    ? OPERATORS.includes(str.charAt(str.length - 1))
    : false;
}

/*
 * Returns a string with or without a minus sign prefixed.
 * @param {String} - str
 */
function getDisplay(str) {
  console.assert(typeof str === "string", "expression must be string");
  let lastNum = getLastNum(str);
  return parseInt(str, 10) < 0 ? "-" + lastNum : lastNum;
}

/*
 * Returns true if string represents a valid number (not undefined or NaN)
 * @param {String}
 */
function isValidNumber(str) {
  let num = parseInt(str, 10);
  return num !== undefined && !isNaN(num) && typeof num === "number";
}

/*
 * Evaluates the current expression in state and returns new state.
 * @param {Object} state - State object
 * @param {Number} multiplier - Either 1 or -1.
 * @percent {Number} divisor - Either 1 or 100
 */
function evaluateExpression(state, multiplier, divisor) {
  const lastNumIdx = endsWithOperator(state.current)
    ? state.current.length - 1
    : state.current.length;
  const newCurrent = String(
    (eval(state.current.slice(0, lastNumIdx)) * multiplier) / divisor
  );
  const newPrev = String(state.current.slice(0, lastNumIdx));
  return isValidNumber(newCurrent)
    ? {
        current: newCurrent,
        previous: newPrev,
        display: getDisplay(newCurrent)
      }
    : initialState;
}

export default expressionReducer;
