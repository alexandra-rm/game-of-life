import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GamePage, HomePage, NotFoundPage } from "@/pages";
import { store } from "./store";
import { PageContent, PageWrapper, SideColumn } from "./AppComponents";
import { Widgets } from "./modules";
import {
  Statistics,
  HeightStatistics,
  FilledPercentStatistics,
} from "./modules/Statistics";

const App: FC = () => {
  return (
    <Provider store={store}>
      <PageWrapper>
        <PageContent>
          <BrowserRouter>
            <Switch>
              <Route path="/game" component={GamePage} />
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </PageContent>
        <SideColumn>
          <FilledPercentStatistics />
          <HeightStatistics />
          <Statistics />
          <Widgets />
        </SideColumn>
      </PageWrapper>
    </Provider>
  );
};

export { App };
