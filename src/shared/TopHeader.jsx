import React from "react";
import { AppBar, Tabs, Tab, Button } from "@material-ui/core";
import { Home, Map, Poll, PinDrop } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
// import { createBrowserHistory } from "history";

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
      background: rgba(150, 170, 250, 0.8);
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
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickLink = (path) => {
    history.push(path);
  };

  return (
    <>
      <StyledAppBar position="absolute">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Home" icon={<Home />} onClick={()=>{onClickLink("/")}}/>
          <Tab label="Map" icon={<Map />} onClick={()=>{onClickLink("/network-map")}}/>
          <Tab label="Analyze" icon={<Poll />} onClick={()=>{onClickLink("/analyze")}}/>
          <Tab label="Gateways" icon={<PinDrop />} onClick={()=>{onClickLink("/gateways")}}/>
        </Tabs>
        <LoginButton variant="outlined">
          <Link to="/" />
          Login
        </LoginButton>
      </StyledAppBar>
    </>
  );
};

export default TopHeader;