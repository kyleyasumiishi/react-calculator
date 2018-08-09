import * as types from "../../constants";

const OPERATORS = types.BUTTONS.operators.map(operator => {
  return operator.text;
});

const initialState = {
  current: "",
  previous: "",
  display: "0"
};

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

function endsWithOperator(str) {
  return str.length > 0
    ? OPERATORS.includes(str.charAt(str.length - 1))
    : false;
}

/*
 * Returns a string with or without a minus sign prefixed to the display input string.
 * @param {String} - expression
 * @param {String} - display
 * @returns {String}
 */
function getDisplay(expression, display) {
  return parseInt(expression, 10) < 0 ? "-" + display : display;
}

/*
 * Returns true if string represents a valid number (not undefined or NaN)
 * @param {String}
 */
function isValidNumber(str) {
  let num = parseInt(str, 10);
  return num !== undefined && !isNaN(num) && typeof num === "number";
}

function evaluateExpression(state, negate, percent) {
  const lastNumIdx = endsWithOperator(state.current)
    ? state.current.length - 1
    : state.current.length;
  const evaluated = String(
    eval(state.current.slice(0, lastNumIdx) * negate) / percent
  );
  const unevaluated = String(state.current.slice(0, lastNumIdx));
  return isValidNumber(evaluated)
    ? {
        current: evaluated,
        previous: unevaluated,
        display: getDisplay(evaluated, getLastNum(evaluated))
      }
    : initialState;
}

const expressionReducer = (state = initialState, action) => {
  const operators = types.BUTTONS.operators.map(operator => {
    return operator.text;
  });
  const lastIdx = state.current.length - 1;
  const lastChar = state.current.charAt(lastIdx);
  let percent = 1;
  let negate = 1;

  switch (action.type) {
    case types.NUMBER:
      let updated = state.current + action.number;
      return {
        current: updated,
        previous: state.previous,
        display: getDisplay(updated, getLastNum(updated, operators))
      };

    case types.OPERATOR:
      // IF current is an empty string
      // let updated;
      if (state.current === "") {
        if (state.previous === "") {
          return state;
        } else {
          updated = state.previous + action.operator;
          return {
            current: updated,
            previous: state.previous,
            display: getDisplay(
              updated.slice(0, updated.length - 1),
              getLastNum(updated, operators)
            )
          };
        }
      }
      // IF current is NOT an empty string
      else {
        if (operators.indexOf(lastChar) > -1) {
          updated = state.current.slice(0, lastIdx) + action.operator;
          return {
            current: updated,
            previous: state.previous,
            display: getDisplay(
              updated.slice(0, updated.length - 1),
              getLastNum(updated, operators)
            )
          };
        } else {
          updated = state.current + action.operator;
          return {
            current: updated,
            previous: state.previous,
            display: getDisplay(
              updated.slice(0, updated.length - 1),
              getLastNum(updated, operators)
            )
          };
        }
      }
    case types.CLEAR:
      return initialState;
    case types.NEGATE:
      negate = -1;
      return evaluateExpression(state, negate, percent);
    case types.PERCENT:
      percent = 100;
      return evaluateExpression(state, negate, percent);
    case types.EQUALS:
      return evaluateExpression(state, negate, percent);
    case types.DECIMAL:
      const currentReversed = state.current.split("").reverse();
      const endsWithOperator = operators.includes(currentReversed[0]);

      let lastNum = getLastNum(state.current, operators);
      if (endsWithOperator) {
        updated = state.current + "0.";
        return {
          current: updated,
          previous: state.previous,
          display: getDisplay(updated, getLastNum(updated, operators))
        };
      } else if (lastNum.includes(".")) {
        return state;
      } else if (state.current === "") {
        updated = "0.";
        return {
          current: updated,
          previous: state.previous,
          display: getDisplay(updated, getLastNum(updated, operators))
        };
      } else {
        updated = state.current + ".";
        return {
          current: updated,
          previous: state.previous,
          display: getDisplay(updated, getLastNum(updated, operators))
        };
      }

    default:
      return state;
  }
};

export default expressionReducer;
