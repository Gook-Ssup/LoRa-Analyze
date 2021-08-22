import React from "react";
import { AppBar, Tabs, Tab, Button } from "@material-ui/core";
import { Home, Map, Poll } from "@material-ui/icons";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  && {
    background-color: rgba(0, 0, 0, 0.5);
    color: #88bbff;
    font-size: 1rem;
    font-weight: 800;
  }
`;

const LoginButton = styled(Button)`
  && {
    position: absolute;
    right: 10px;
    width: 120px;
    top: 50%;
    transform: translateY(-50%);

    border: 2px solid #88bbff;
    color: #88bbff;

    &:hover {
      background: rgba(250, 150, 170, 0.8);
      color: white;
    }
  }

  a {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const TopHeader = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledAppBar position="absolute">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" icon={<Home />} href="/"/>
          <Tab label="Map" icon={<Map />} href="network-map"/>
          <Tab label="Analyze" icon={<Poll />} />
        </Tabs>
        <LoginButton variant="outlined">
          <Link to="/login" />
          Login
        </LoginButton>
      </StyledAppBar>
    </>
  );
};

export default TopHeader;