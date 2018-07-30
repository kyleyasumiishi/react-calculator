import React from "react";
import expressionReducer from "../js/reducers/expressionReducer";
import * as types from "../constants";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("expressionReducer", () => {
  it("should handle NUMBER action type", () => {
    const initialState = {
      currentExpression: "",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialState, {
        type: types.NUMBER,
        number: "5"
      }).currentExpression
    ).toEqual("5");
  });
  it("should handle OPERATOR action type", () => {
    const initialStateA = {
      currentExpression: "",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateA, {
        type: types.OPERATOR,
        operator: "*"
      }).currentExpression
    ).toEqual("");
    const initialStateB = {
      currentExpression: "5",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateB, {
        type: types.OPERATOR,
        operator: "*"
      }).currentExpression
    ).toEqual("5*");
    const initialStateC = {
      currentExpression: "5/",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateC, {
        type: types.OPERATOR,
        operator: "*"
      }).currentExpression
    ).toEqual("5*");
    const initialStateD = {
      currentExpression: "",
      previousExpression: "30"
    };
    expect(
      expressionReducer(initialStateD, {
        type: types.OPERATOR,
        operator: "*"
      }).currentExpression
    ).toEqual("30*");
  });
  it("should handle DECIMAL action type", () => {
    const initialStateA = {
      currentExpression: "",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateA, {
        type: types.DECIMAL,
        decimal: "."
      }).currentExpression
    ).toEqual("0.");
    const initialStateB = {
      currentExpression: "",
      previousExpression: "30"
    };
    expect(
      expressionReducer(initialStateB, {
        type: types.DECIMAL,
        decimal: "."
      }).currentExpression
    ).toEqual("0.");
    const initialStateC = {
      currentExpression: "4+",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateC, {
        type: types.DECIMAL,
        decimal: "."
      }).currentExpression
    ).toEqual("4+0.");
    const initialStateD = {
      currentExpression: "4",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateD, {
        type: types.DECIMAL,
        decimal: "."
      }).currentExpression
    ).toEqual("4.");
    const initialStateE = {
      currentExpression: "4.5+70",
      previousExpression: ""
    };
    expect(
      expressionReducer(initialStateE, {
        type: types.DECIMAL,
        decimal: "."
      }).currentExpression
    ).toEqual("4.5+70");
  });
});
