import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// Import containers
import { NumbersContainer } from "../js/containers/NumbersContainer";
import { DisplayContainer } from "../js/containers/DisplayContainer";
import { OperatorsContainer } from "../js/containers/OperatorsContainer";
import { DecimalContainer } from "../js/containers/DecimalContainer";

// Import components
import Button from "../js/components/Button";
import Display from "../js/components/Display";
import { wrap } from "module";

configure({ adapter: new Adapter() });

describe("containers", () => {
  describe("NumbersContainer", () => {
    it("should render 10 Button components", () => {
      const wrapper = mount(<NumbersContainer />);
      expect(wrapper.find(Button)).toHaveLength(10);
    });
  });
  describe("DisplayContainer", () => {
    it("should render a Display component", () => {
      const wrapper = mount(<DisplayContainer />);
      expect(wrapper.find(Display)).toHaveLength(1);
    });
  });
  describe("OperatorsContainer", () => {
    it("should render 4 Button components", () => {
      const wrapper = mount(<OperatorsContainer />);
      expect(wrapper.find(Button)).toHaveLength(4);
    });
  });
  describe("DecimalContainer", () => {
    it("should render 1 Button component", () => {
      const wrapper = mount(<DecimalContainer />);
      expect(wrapper.find(Button)).toHaveLength(1);
    });
  });
});
