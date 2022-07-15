import React, { useState, useRef, ChangeEvent } from "react";
import useGetSceneImages from "../hooks/useGetSceneImages";
import { Box, Paper, Grid } from "@mui/material";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Popup from "../components/Popup";
import Toast from "../components/Toast";
import CircularProgress from "@mui/material/CircularProgress";

const ProgressWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled(Paper)<{ $color: string }>`
  && {
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: ${(props) => props.$color};
    padding: 10px;
  }
`;

const BoxStyled = styled(Box)`
  height: 75vh;
  overflow-x: scroll;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Main = () => {
  const [page, setPage] = useState(1);
  const [toggleModalSrc, setToggleModalSrc] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  const { loading, error, count, currentData } = useGetSceneImages({
    page,
  });

  const handlePageChange = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
  };

  const handleToggleModal = (url: string) => {
    setToggleModalSrc(url);
  };

  return (
    <>
      {error && <Toast message={error} isOpen={true} />}
      {loading ? (
        <ProgressWrapper>
          <CircularProgress color='secondary' size={100} />
        </ProgressWrapper>
      ) : (
        <BoxStyled sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            style={{ justifyContent: "center" }}
          >
            {currentData &&
              currentData.map((scene, index: number) => {
                return (
                  <Grid item xs={3} sm={4} md={4} key={index}>
                    <Item
                      onClick={() => handleToggleModal(scene.url)}
                      $color={scene.color}
                    >
                      <img
                        ref={imageRef}
                        style={{ width: "100%" }}
                        src={scene.url}
                        alt={scene.url}
                      />
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
          <Popup
            forwardRef={imageRef}
            toggleModalSrc={toggleModalSrc}
            handleToggleModal={handleToggleModal}
          />
        </BoxStyled>
      )}
      {!loading && !error && (
        <PaginationWrapper>
          <Pagination
            count={count}
            size='large'
            page={page}
            variant='outlined'
            shape='rounded'
            onChange={handlePageChange}
          />
        </PaginationWrapper>
      )}
    </>
  );
};

export default Main;
