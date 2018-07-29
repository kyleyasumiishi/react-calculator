import React from "react";
import expressionReducer from "../js/reducers/expressionReducer";
import * as types from "../constants";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("expressionReducer", () => {
  it("should handle NUMBER action type", () => {
    const initialState = "";
    expect(
      expressionReducer(initialState, {
        type: types.NUMBER,
        number: "5"
      })
    ).toEqual("5");
  });
});
