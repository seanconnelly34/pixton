import React from "react";
import { Container } from "@mui/system";
import HeaderBackground from "../assets/headerBackground.svg";
import PixtonLogo from "../assets/pixtonWhite.svg";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  height: 46px;
  overflow: hidden;
  background-image: url(${HeaderBackground});
  margin-bottom: 16px;
  img {
    width: 200px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Container>
        <img src={PixtonLogo} alt='Pixton' />
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
