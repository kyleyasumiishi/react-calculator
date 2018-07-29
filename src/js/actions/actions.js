import * as types from "../../constants";

export const clickNumber = number => {
  return {
    type: types.NUMBER,
    number
  };
};
