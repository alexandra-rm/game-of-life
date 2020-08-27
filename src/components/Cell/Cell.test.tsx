import React from "react";
import { mount } from "enzyme";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("calls onClick callback with correct args on cell", () => {
    const onClick = jest.fn();
    const x = 1;
    const y = 2;
    const renderedComponent = mount(<Cell x={x} y={y} onClick={onClick} />);
    renderedComponent.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(x, y);
  });
});
