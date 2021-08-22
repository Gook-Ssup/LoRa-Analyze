import React from 'react';
import styled from "styled-components";

const Background = styled.div`
  background: linear-gradient(120deg, #00febb, #00ccee);
`;

const Container = styled.div`
  max-width: 2048px;
  height: 100vh;
  margin: auto;
  padding: 80px 50px;
`;


const PageContainer = ({props, children}) => {
    return (
        <Background {...props}>
          <Container>
            {children}
          </Container>
        </Background>
    );
};

export default PageContainer;