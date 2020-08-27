import React from "react";
import styled from "@emotion/styled";
import { Button } from "@/components";
import { actions, MIN_USERNAME_LENGTH } from "./reducer";
import { connect } from "react-redux";

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 20px;
  font-size: 1.2rem;
`;

const Wrapper = styled.div`
  font-size: 2rem;
`;

const mapDispatchToProps = {
  login: actions.login,
};

type Props = typeof mapDispatchToProps;

const LoginFormComponent = ({ login }: Props) => {
  const [username, setUserName] = React.useState("");

  const onChangeHandler = React.useCallback((event) => {
    const { value } = event.target;
    setUserName(value);
  }, []);

  const loginHandler = React.useCallback(() => {
    if (username.length >= MIN_USERNAME_LENGTH) login(username);
  }, [username]);

  return (
    <Wrapper>
      <Input
        name="username"
        value={username}
        onChange={onChangeHandler}
        placeholder="Username"
      />
      <Button
        onClick={loginHandler}
        fullWidth
        disabled={username.length < MIN_USERNAME_LENGTH}
      >
        Войти
      </Button>
    </Wrapper>
  );
};

export const LoginForm = connect(
  undefined,
  mapDispatchToProps
)(LoginFormComponent);
