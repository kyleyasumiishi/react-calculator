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

export const clickDecimal = decimal => {
  return {
    type: types.DECIMAL,
    decimal
  };
};

export const clickClear = () => {
  return {
    type: types.CLEAR
  };
};
