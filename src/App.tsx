import React, { FC } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GamePage, HomePage, NotFoundPage } from "@/pages";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game" component={GamePage} />
        <Route path="/" exact component={HomePage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};

export { App };
