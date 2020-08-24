import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GamePage, HomePage, NotFoundPage } from "@/pages";
import { store } from "./store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/game" component={GamePage} />
          <Route path="/" exact component={HomePage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export { App };
