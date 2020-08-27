import React from "react";
import { LoginForm, AccessChecker } from "@/modules";
import { RelativeWrapper, AbsoluteCenter } from "./styled";

export const LoginPage = () => (
  <AccessChecker onlyUnauthorized redirectPath="/">
    <RelativeWrapper>
      <AbsoluteCenter>
        <LoginForm />
      </AbsoluteCenter>
    </RelativeWrapper>
  </AccessChecker>
);
