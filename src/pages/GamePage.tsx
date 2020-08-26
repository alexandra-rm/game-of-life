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

const H1 = styled.h1`
  margin-top: 0;
`;

const Links = styled.div`
  ${StyledNavLink} {
    margin-right: 20px;
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
      <H1>
        Game
        <StyledNavLink exact to="/">
          На главную
        </StyledNavLink>
      </H1>
      <Links>
        <StyledNavLink exact to={`${match.url}`}>
          Игра
        </StyledNavLink>
        <StyledNavLink to={`${match.url}/statistics`}>Статистика</StyledNavLink>
      </Links>
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
