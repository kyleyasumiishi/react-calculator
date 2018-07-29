import { combineReducers } from "redux";
import { BUTTONS } from "../../constants";

const buttonsReducer = (state = BUTTONS, action) => {
  return state;
};

const allReducers = combineReducers({
  buttons: buttonsReducer
});

export default allReducers;
