import React from "react";
import Display from "../js/components/Display";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

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
