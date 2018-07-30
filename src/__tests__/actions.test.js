import React from "react";
import * as actions from "../js/actions/actions";
import * as types from "../constants";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("actions", () => {
  describe("clickNumber", () => {
    it("should create a NUMBER action", () => {
      const number = "5";
      const expectedAction = {
        type: types.NUMBER,
        number
      };
      expect(actions.clickNumber(number)).toEqual(expectedAction);
    });
  });
  describe("clickOperator", () => {
    it("should create an OPERATOR action", () => {
      const operator = "/";
      const expectedAction = {
        type: types.OPERATOR,
        operator
      };
      expect(actions.clickOperator(operator)).toEqual(expectedAction);
    });
  });
});
