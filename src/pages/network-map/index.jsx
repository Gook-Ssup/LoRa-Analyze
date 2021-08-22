import React from "react";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";



// shared 
import PageContainer from "shared/PageContainer";

// local
import Maps from "./Maps"


const Home = () => {
  return (
    <PageContainer>
	  <Maps></Maps>
    </PageContainer>
  );
};

export default Home;