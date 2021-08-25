import React from 'react';
import styled from "styled-components";
import { Card } from "@material-ui/core";

const StyledCard = styled(Card)`
  && {
    width:100%;
    height: wrap-content;
    max-height: 80vh;
    padding: 30px 0;
    margin: 20px auto;

    background: rgb(0, 0, 0, 0.7);
  }

  * {
    color: rgb(255,255,255) !important;
  }
`;

const PageCard = ({ props, children }) => {
    return (
        <StyledCard {...props}>{children}</StyledCard>
    );
};

export default PageCard;