import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { FaDna } from "react-icons/fa";
import { RootState } from "@/store";
import { WidgetBase, Badge } from "@/components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > * {
    margin-right: 20px;
  }
`;

const mapStateToProps = ({ statistics }: RootState) => ({
  generation: statistics.generation,
});

export type Props = ReturnType<typeof mapStateToProps>;

const GenerationWidgetComponent = ({ generation }: Props) => (
  <WidgetBase color="white">
    <Wrapper>
      <Badge text={<FaDna />} color="red" />
      {`Поколение №  ${generation}`}
    </Wrapper>
  </WidgetBase>
);

export const GenerationWidget = connect(mapStateToProps)(
  GenerationWidgetComponent
);
