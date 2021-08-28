import React from "react";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { Link } from "react-router-dom";

// local
import PageContainer from "shared/PageContainer";

// shared
import GookSsup from "img/gook-ssup.png";

const MainHeader = styled.div`
  padding: 100px 0px;
`;

const MainTitle = styled(Typography)`
  && {
    text-align: center;
    font-size: 3rem;
    color: #5577dd;
  }
`;

const MainBody = styled.div`
  padding: 50px 50px;
  margin: auto;
  display: flex;
`;

const Home = () => {
  return (
    <PageContainer>
      <MainHeader>
        <div style={{ textAlign:'center' }}>
          <img src={GookSsup}></img>
        </div>
        {/* <MainTitle>Lora Analyze</MainTitle> */}
      </MainHeader>
      <MainBody>
        <Button
          style={{ margin: "auto", borderRadius: "50%", paddingLeft: "15px" }}
        >
          <Link to="/network-map">
            <Send style={{ color: "#5577dd", fontSize: 50 }} />
          </Link>
        </Button>
      </MainBody>
    </PageContainer>
  );
};

export default Home;
