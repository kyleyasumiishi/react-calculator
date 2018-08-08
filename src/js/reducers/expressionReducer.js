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
  let negate = 1;
  let percent = 1;

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
    // NEGATE logic falls through to EQUALS.
    case types.NEGATE:
      negate = -1;
    // PERCENT logic falls through to EQUALS.
    case types.PERCENT:
      percent = 100;
    case types.EQUALS:
      if (operators.includes(lastChar)) {
        return {
          current: String(
            eval((state.current.slice(0, lastIdx) * negate) / percent)
          ),
          previous: String(state.current.slice(0, lastIdx))
        };
      } else {
        return {
          current: String((eval(state.current) * negate) / percent),
          previous: String(state.current)
        };
      }
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
