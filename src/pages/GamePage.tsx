import React from "react";
import styled from "@emotion/styled";
import { GameOfLife } from "@/modules";

const GameWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const GamePage = () => (
  <div>
    <GameWrapper>
      <GameOfLife />
    </GameWrapper>
  </div>
);
