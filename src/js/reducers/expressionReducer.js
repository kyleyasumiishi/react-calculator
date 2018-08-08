import * as types from "../../constants";

const initialState = {
  current: "",
  previous: ""
};

const expressionReducer = (state = initialState, action) => {
  const operators = types.BUTTONS.operators.map(operator => {
    return operator.text;
  });
  const lastIdx = state.current.length - 1;
  const lastChar = state.current.charAt(lastIdx);

  switch (action.type) {
    case types.NUMBER:
      return {
        current: state.current + action.number,
        previous: state.previous
      };

    case types.OPERATOR:
      // IF current is an empty string
      if (state.current === "") {
        if (state.previous === "") {
          return state;
        } else {
          return {
            current: state.previous + action.operator,
            previous: state.previous
          };
        }
      }
      // IF current is NOT an empty string
      else {
        if (operators.indexOf(lastChar) > -1) {
          return {
            current: state.current.slice(0, lastIdx) + action.operator,
            previous: state.previous
          };
        } else {
          return {
            current: state.current + action.operator,
            previous: state.previous
          };
        }
      }
    case types.CLEAR:
      return {
        current: "",
        previous: ""
      };
    case types.EQUALS:
      if (operators.indexOf(lastChar) > -1) {
        return {
          current: String(eval(state.current.slice(0, lastIdx))),
          previous: String(state.current.slice(0, lastIdx))
        };
      } else {
        return {
          current: String(eval(state.current)),
          previous: String(state.current)
        };
      }
    case types.NEGATE:
    case types.PERCENT: // first evaluate. then divide by 100
    case types.DECIMAL: // if current number contains a decimal, not entire expression
      const currentReversed = state.current.split("").reverse();
      const endsWithOperator = operators.includes(currentReversed[0]);
      let isNum = true;
      let lastNum = "";
      let startIdx = endsWithOperator ? 1 : 0;

      while (isNum) {
        for (let i = startIdx; i < currentReversed.length; i++) {
          const char = currentReversed[i];
          if (operators.includes(char)) {
            isNum = false;
            break;
          } else {
            lastNum = char + lastNum;
          }
        }
        break;
      }

      if (endsWithOperator) {
        return {
          current: state.current + "0.",
          previous: state.previous
        };
      } else if (lastNum.includes(".")) {
        return state;
      } else if (state.current === "") {
        return {
          current: "0.",
          previous: state.previous
        };
      } else {
        return {
          current: state.current + ".",
          previous: state.previous
        };
      }

    default:
      return state;
  }
};

export default expressionReducer;
