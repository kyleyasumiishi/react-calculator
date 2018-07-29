import React from "react";
import { NumbersContainer } from "../js/containers/NumbersContainer";
import Button from "../js/components/Button";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("NumbersContainer", () => {
  it("should render 10 Button components", () => {
    const wrapper = mount(<NumbersContainer />);
    expect(wrapper.find(Button)).toHaveLength(10);
  });
});
