import React from "react";
import { LoginForm } from "@/modules/Account/LoginForm";
import { RelativeWrapper, AbsoluteCenter } from "./styled";
import { AccessChecker } from "@/modules/Account/AccessChecker";

export const LoginPage = () => (
  <AccessChecker onlyUnauthorized redirectPath="/">
    <RelativeWrapper>
      <AbsoluteCenter>
        <LoginForm />
      </AbsoluteCenter>
    </RelativeWrapper>
  </AccessChecker>
);
