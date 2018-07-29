import {
  NUMBER,
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  CLEAR,
  EQUALS,
  NEGATE,
  PERCENT,
  DECIMAL
} from "../../constants";

const expressionReducer = (state = "initial", action) => {
  switch (action.type) {
    case NUMBER:
    case ADD:
    case SUBTRACT:
    case DIVIDE:
    case MULTIPLY:
    case CLEAR:
    case EQUALS:
    case NEGATE:
    case PERCENT:
    case DECIMAL:
    default:
      return state;
  }
};

export default expressionReducer;
