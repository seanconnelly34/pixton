import React from "react";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import HeaderBackground from "../assets/headerBackground.svg";
import PixtonLogo from "../assets/pixtonWhite.svg";
import styledComponent from "styled-components";
import { styled } from "@mui/material/styles";

const H6 = styled(Typography)({
  color: "white",
  fontStyle: "italic",
}) as typeof Typography;

const HeaderWrapper = styledComponent.div`
  height: 86px;
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
        <H6 variant='h6' component='div' gutterBottom>
          Scene Gallery
        </H6>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
