import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import styled from "@emotion/styled";
import { RootState } from "@/store";
import { WidgetBase } from "@/components";
import { RangeRow } from "./components/RangeRow";
import { TableForm } from "./components/TableForm";
import { actions } from "./reducer";

const Label = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 0 0;
  font-size: 0.8rem;
  > input {
    cursor: pointer;
  }
`;

const mapStateToProps = ({ game }: RootState) => ({
  height: game.height,
  width: game.width,
  isRunning: game.isRunning,
});

const mapDispatchToProps = {
  resize: actions.resize,
};

export type SizeSettingsProps = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps;

export const SizeSettings: React.FC<SizeSettingsProps> = ({
  width,
  height,
  isRunning,
  resize,
}) => {
  const onChange = React.useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      if (name === "height") {
        resize({ height: value, width: width });
      } else if (name === "width") {
        resize({ height: height, width: value });
      } else {
        resize({ height: value, width: value });
      }
    },
    [resize, width, height]
  );

  const [isSquare, setIsSquare] = React.useState(false);

  const setProportion = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      if (checked) {
        resize({ height: width, width: width });
      }
      setIsSquare(checked);
    },
    [resize, width]
  );

  return (
    <WidgetBase title="Size settings" color="yellow">
      <Label>
        <input type="checkbox" checked={isSquare} onChange={setProportion} />
        Пропорционально
      </Label>
      <TableForm>
        {isSquare ? (
          <RangeRow
            label="Size"
            name="size"
            value={width}
            max={45}
            min="3"
            onChange={onChange}
            disabled={isRunning}
          />
        ) : (
          <>
            <RangeRow
              label="Width"
              name="width"
              value={width}
              max={45}
              min="3"
              onChange={onChange}
              disabled={isRunning}
            />
            <RangeRow
              label="Height"
              name="height"
              value={height}
              max={45}
              min={3}
              onChange={onChange}
              disabled={isRunning}
            />
          </>
        )}
      </TableForm>
    </WidgetBase>
  );
};

export const SizeWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(SizeSettings);
