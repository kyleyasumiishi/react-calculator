import * as types from "../../constants";

const initialState = {
  currentExpression: "",
  previousExpression: ""
};

const expressionReducer = (state = initialState, action) => {
  const operators = types.BUTTONS.operators.map(operator => {
    return operator.text;
  });
  // const numbers = types.BUTTONS.numbers.map(number => {
  //   return number.text;
  // });
  const lastIdx = state.currentExpression.length - 1;
  const lastChar = state.currentExpression.charAt(lastIdx);

  switch (action.type) {
    case types.NUMBER:
      return {
        currentExpression: state.currentExpression + action.number,
        previousExpression: state.previousExpression
      };

    case types.OPERATOR:
      // IF currentExpression is an empty string
      if (state.currentExpression === "") {
        if (state.previousExpression === "") {
          return state;
        } else {
          return {
            currentExpression: state.previousExpression + action.operator,
            previousExpression: state.previousExpression
          };
        }
      }
      // IF currentExpression is NOT an empty string
      else {
        if (operators.indexOf(lastChar) > -1) {
          return {
            currentExpression:
              state.currentExpression.slice(0, lastIdx) + action.operator,
            previousExpression: state.previousExpression
          };
        } else {
          return {
            currentExpression: state.currentExpression + action.operator,
            previousExpression: state.previousExpression
          };
        }
      }
    case types.CLEAR:
    case types.EQUALS:
    case types.NEGATE:
    case types.PERCENT:
    case types.DECIMAL:
      if (state.currentExpression.indexOf(".") > -1) {
        return state;
      } else if (state.currentExpression === "") {
        return {
          currentExpression: "0.",
          previousExpression: state.previousExpression
        };
      } else {
        if (operators.indexOf(lastChar) > -1) {
          return {
            currentExpression: state.currentExpression + "0.",
            previousExpression: state.previousExpression
          };
        } else {
          return {
            currentExpression: state.currentExpression + ".",
            previousExpression: state.previousExpression
          };
        }
      }
    default:
      return state;
  }
};

export default expressionReducer;
