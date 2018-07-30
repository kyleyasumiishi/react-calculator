import * as types from "../../constants";

export const clickNumber = number => {
  return {
    type: types.NUMBER,
    number
  };
};

export const clickOperator = operator => {
  return {
    type: types.OPERATOR,
    operator
  };
};
