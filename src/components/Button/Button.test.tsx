import React from "react";
import { mount } from "enzyme";
import { Button } from "./Button";

describe("Button", () => {
  it("calls onClick callback", () => {
    const onClick = jest.fn();
    const renderedComponent = mount(<Button onClick={onClick} />);
    renderedComponent.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't's call onClick callback on disabled Button", () => {
    const onClick = jest.fn();
    const renderedComponent = mount(
      <Button onClick={onClick} disabled fullWidth />
    );
    renderedComponent.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
