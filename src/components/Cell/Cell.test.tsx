import React from "react";
import { mount } from "enzyme";
import { Cell } from "./Cell";

describe("Cell", () => {
  it("calls onClick callback on unfilled cell", () => {
    const onClick = jest.fn();
    const x = 1;
    const y = 2;
    const renderedComponent = mount(<Cell x={x} y={y} onClick={onClick} />);
    renderedComponent.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(x, y);
  });

  it("calls onClick callback on filled cell", () => {
    const onClick = jest.fn();
    const x = 3;
    const y = 6;
    const renderedComponent = mount(
      <Cell x={x} y={y} isFilled onClick={onClick} />
    );
    renderedComponent.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(x, y);
  });
});
