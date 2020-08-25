import React from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import { GameOfLife } from "@/modules";
import { actions } from "@/modules/Widgets/reducer";
import { HeightStatistics } from "@/modules/Statistics";
import { BetWindow } from "@/modules/Bets/BetWindow";

const GameWrapper = styled.div`
  max-width: 60%;
  margin: 0 auto;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 5px 20px;
  border-radius: 20px;
  color: #bebec2;
  text-decoration: none;

  &.active {
    background-color: #323a52;
    color: white;
  }
`;

export const GamePage = ({ match }) => {
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
      <div>
        <Link to="/">На главную</Link>
        <StyledNavLink exact to={`${match.url}`}>
          Игра
        </StyledNavLink>
        <StyledNavLink to={`${match.url}/statistics`}>Статистика</StyledNavLink>
      </div>
      <GameWrapper>
        <Switch>
          <Route exact path={`${match.url}`} component={GameOfLife} />
          <Route
            path={`${match.url}/statistics`}
            component={HeightStatistics}
          />
        </Switch>
      </GameWrapper>
      <BetWindow />
    </div>
  );
};
