import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GamePage, HomePage, NotFoundPage } from "@/pages";
import { store } from "./store";
import { PageContent, PageWrapper, SideColumn } from "./AppComponents";

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
        <SideColumn>SideColumn</SideColumn>
      </PageWrapper>
    </Provider>
  );
};

export { App };
