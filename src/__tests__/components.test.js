import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Import components
import Button from "../js/components/Button";
import Display from "../js/components/Display";

configure({ adapter: new Adapter() });

describe("components", () => {
  describe("Button", () => {
    it("should render a <div> element with a className attribute equal to {props.className}", () => {
      const wrapper = shallow(<Button className="clear-container" />);
      const div = wrapper.find("div");
      expect(div.exists()).toBeTruthy();
      expect(div.props().className).toEqual("clear-container");
    });
    it("should contain a <button> element with an id attribute equal to {props.id}", () => {
      const wrapper = shallow(<Button id="clear" />);
      const button = wrapper.find("button");
      expect(button.exists()).toBeTruthy();
      expect(button.props().id).toEqual("clear");
    });
    it("has an onClick method", () => {
      const fakeFunction = jest.fn();
      const wrapper = shallow(<Button onClick={fakeFunction} />);
      const button = wrapper.find("button");
      button.simulate("click");
      expect(fakeFunction).toHaveBeenCalledTimes(1);
    });
    it("the button contains text", () => {
      const wrapper = shallow(<Button text="A/C" />);
      const button = wrapper.find("button");
      expect(button.text()).toEqual("A/C");
    });
  });
  describe("Display", () => {
    it("renders a <div> element with a className attribute equal to {props.className}", () => {
      const wrapper = shallow(<Display className="display-container" />);
      const div = wrapper.find("div");
      expect(div.exists()).toBeTruthy();
      expect(div.props().className).toEqual("display-container");
    });
    it("contains a <p> element with an id attribute equal to {props.id}", () => {
      const wrapper = shallow(<Display id="display" />);
      const p = wrapper.find("p");
      expect(p.exists()).toBeTruthy();
      expect(p.props().id).toEqual("display");
    });
    it("contains text equal to {props.display}", () => {
      const wrapper = shallow(<Display display="42" />);
      const p = wrapper.find("p");
      expect(p.text()).toEqual("42");
    });
  });
});
