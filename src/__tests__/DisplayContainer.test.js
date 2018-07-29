import React from "react";
import { DisplayContainer } from "../js/containers/DisplayContainer";
import Display from "../js/components/Display";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("DisplayContainer", () => {
  it("should render a Display component", () => {
    const wrapper = mount(<DisplayContainer />);
    expect(wrapper.find(Display)).toHaveLength(1);
  });
});
