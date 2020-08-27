import React from "react";
import { mount, shallow } from "enzyme";
import { HeightMap } from "./HeightMap";
import { Cell } from "../Cell";

describe("HeightMap", () => {
  it("render needed count cells", () => {
    const wrapper = shallow(
      <HeightMap
        cells={[
          [1, 2, 2],
          [3, 2, 1],
          [1, 0, 0],
        ]}
        onClick={jest.fn()}
      />
    );

    expect(wrapper.find(Cell)).toHaveLength(9);
  });

  it("calls onClick with correct args", () => {
    const fields = [
      [1, 4],
      [2, 2],
    ];
    const onClick = jest.fn();

    const cells = mount(<HeightMap cells={fields} onClick={onClick} />).find(
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
