import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const H6 = styled(Typography)({
  color: "black",
  textAlign: "center",
}) as typeof Typography;

const ModalStyled = styled(Modal)`
  .MuiBox-root {
    border-radius: 5px;
    width: 60%;
    max-height: 600px;
    max-width: 600px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border: none;
    background: white;
  }
  .MuiBox-root:focus-visible {
    outline: none;
  }
  img {
    width: 100%;
    max-height: 600px;
    max-width: 600px;
  }
  .MuiTypography-root {
    font-size: 1rem;
  }
`;

type TPopup = {
  toggleModalSrc: string;
  handleToggleModal: (arg: string) => void;
};

const Popup = ({ toggleModalSrc, handleToggleModal }: TPopup) => {
  return (
    <ModalStyled open={!!toggleModalSrc} onClose={() => handleToggleModal("")}>
      <Box>
        <img src={toggleModalSrc} alt={toggleModalSrc} />
        <H6 variant='h6' component='div' gutterBottom>
          Original
        </H6>
      </Box>
    </ModalStyled>
  );
};

export default Popup;
