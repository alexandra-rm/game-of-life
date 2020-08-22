import React from "react";
import { mount, shallow } from "enzyme";
import { GameField } from "./GameField";
import { Cell } from "@/components";

describe("GameField", () => {
  it("render needed count cells", () => {
    const wrapper = shallow(
      <GameField
        cells={[
          [false, false, false],
          [false, false, false],
          [false, false, false],
        ]}
        onClick={jest.fn()}
      />
    );

    expect(wrapper.find(Cell)).toHaveLength(9);
  });

  it("calls onClick with correct args", () => {
    const fields = [
      [true, false],
      [false, true],
    ];
    const onClick = jest.fn();

    const cells = mount(<GameField cells={fields} onClick={onClick} />).find(
      "button"
    );

    const cellsCount = fields.length * fields[0].length;
    expect(cells).toHaveLength(cellsCount);

    let index = 0;
    fields.forEach((row, y) => {
      row.forEach((currCellValue, x) => {
        const cell = cells.at(index);

        cell.simulate("click");
        expect(onClick).lastCalledWith(x, y);

        index++;
      });
    });
    expect(onClick).toBeCalledTimes(cellsCount);
  });
});
