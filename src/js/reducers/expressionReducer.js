import * as types from "../../constants";

const initialState = {
  current: "",
  previous: "",
  display: "0"
};

function getLastNum(current, operators) {
  const currentReversed = current.split("").reverse();
  const endsWithOperator = operators.includes(currentReversed[0]);
  let isNum = true;
  let lastNum = "";
  let startIdx = endsWithOperator ? 1 : 0;
  while (isNum) {
    for (let i = startIdx; i < currentReversed.length; i++) {
      console.log("lastNum: ", lastNum);
      const char = currentReversed[i];
      console.log("char: ", char);
      if (operators.includes(char)) {
        isNum = false;
        break;
      } else {
        lastNum = char + lastNum;
      }
    }
    break;
  }
  return lastNum;
}

function evaluateExpression(state, operators, negate, percent) {
  const lastIdx = state.current.length - 1;
  const lastChar = state.current.charAt(lastIdx);
  let updated;
  if (operators.includes(lastChar)) {
    updated = String(
      eval((state.current.slice(0, lastIdx) * negate) / percent)
    );
    // console.log("updated", updated);
    return {
      current: updated,
      previous: String(state.current.slice(0, lastIdx)),
      display: getLastNum(updated, operators)
    };
  } else {
    updated = String((eval(state.current) * negate) / percent);
    // console.log("updated", updated);
    return {
      current: updated,
      previous: String(state.current),
      display: getLastNum(updated, operators)
    };
  }
}

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
      let updated = state.current + action.number;
      return {
        current: updated,
        previous: state.previous,
        display: getLastNum(updated, operators)
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
            display: getLastNum(updated, operators)
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
            display: getLastNum(updated, operators)
          };
        } else {
          updated = state.current + action.operator;
          return {
            current: updated,
            previous: state.previous,
            display: getLastNum(updated, operators)
          };
        }
      }
    case types.CLEAR:
      return {
        current: "",
        previous: "",
        display: "0"
      };
    case types.NEGATE:
      negate = -1;
      return evaluateExpression(state, operators, negate, percent);
    case types.PERCENT:
      percent = 100;
      return evaluateExpression(state, operators, negate, percent);
    case types.EQUALS:
      return evaluateExpression(state, operators, negate, percent);
    case types.DECIMAL:
      const currentReversed = state.current.split("").reverse();
      const endsWithOperator = operators.includes(currentReversed[0]);

      let lastNum = getLastNum(state.current, operators);
      if (endsWithOperator) {
        updated = state.current + "0.";
        return {
          current: updated,
          previous: state.previous,
          display: getLastNum(updated, operators)
        };
      } else if (lastNum.includes(".")) {
        return state;
      } else if (state.current === "") {
        updated = "0.";
        return {
          current: updated,
          previous: state.previous,
          display: getLastNum(updated, operators)
        };
      } else {
        updated = state.current + ".";
        return {
          current: updated,
          previous: state.previous,
          display: getLastNum(updated, operators)
        };
      }

    default:
      return state;
  }
};

export default expressionReducer;
