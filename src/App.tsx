import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { GamePage, HomePage, NotFoundPage, LoginPage } from "@/pages";
import { store } from "./store";
import { PageContent, PageWrapper, SideColumn } from "./AppComponents";
import { Widgets } from "./modules";
import { GenerationWidget } from "./modules/Statistics";
import { BalanceWidget } from "./modules/Money";

const App: FC = () => {
  return (
    <Provider store={store}>
      <ReactNotification />
      <PageWrapper>
        <PageContent>
          <BrowserRouter>
            <Switch>
              <Route path="/game" component={GamePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </PageContent>
        <SideColumn>
          <Widgets />
          <BalanceWidget />
          <GenerationWidget />
        </SideColumn>
      </PageWrapper>
    </Provider>
  );
};

export { App };
