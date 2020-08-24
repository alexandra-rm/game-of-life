import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GameOfLife } from "@/modules";
import { actions } from "@/modules/Widgets/reducer";

const GameWrapper = styled.div`
  max-width: 60%;
  margin: 0 auto;
`;

export const GamePage = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#size",
        widget: "SizeWidget",
      })
    );
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#params",
        widget: "GameParamsWidget",
      })
    );
    dispatch(
      actions.addCurrentPageWidget({
        id: "game#process",
        widget: "GameProcessWidget",
      })
    );

    return () => dispatch(actions.clearPageWidgets());
  }, []);

  return (
    <div>
      <GameWrapper>
        <GameOfLife />
        <Link to="/">На главную</Link>
      </GameWrapper>
    </div>
  );
};
