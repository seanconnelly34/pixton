import React, {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  LegacyRef,
} from "react";
import useGetSceneImages from "../hooks/useGetSceneImages";
import { Box, Paper, Grid } from "@mui/material";
import styled from "styled-components";
import Pagination from "@mui/material/Pagination";
import Popup from "../components/Popup";
import Toast from "../components/Toast";
import CircularProgress from "@mui/material/CircularProgress";
import randomColor from "randomcolor";

const SVGWrapperStyles = styled.span`
  svg {
    width: 100%;
    height: 100%;
  }
`;

const ProgressWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled(Paper)`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px;
`;

const BoxStyled = styled(Box)`
  height: 72vh;
  overflow-x: scroll;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const PaginationStyleWrapper = styled.div`
  .MuiButtonBase-root {
    font-size: 30px;
    color: #0277bd;
    border: 2px solid #04a9f4;
  }
  .Mui-selected {
    background-color: #0277bd !important;
    color: white;
  }
  .MuiButtonBase-root:hover {
    background-color: #04a9f4;
    color: white;
  }
`;
const Main = () => {
  const [page, setPage] = useState(1);
  const [toggleModalSrc, setToggleModalSrc] = useState("");
  const imageRef = useRef<HTMLImageElement | LegacyRef<HTMLSpanElement>>(null);
  const [svgs, setSVG] = useState<string[] | undefined>();

  const { loading, error, count, currentData } = useGetSceneImages({
    page,
  });

  const handlePageChange = (e: ChangeEvent<unknown>, p: number) => {
    setPage(p);
  };

  const handleToggleModal = (url: string) => {
    setToggleModalSrc(url);
  };

  useEffect(() => {
    if (currentData) {
      Promise.all(
        currentData.map((scene) => fetch(scene.url).then((res) => res.text()))
      ).then((data) => {
        const fillRandom = data.map((svg) => {
          return svg.replaceAll("fill=", () => `fill="${randomColor()}"`);
        });

        return setSVG(fillRandom);
      });
    }
  }, [currentData]);

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
              currentData.map((scene, index) => (
                <Grid item xs={3} sm={4} md={4} key={index}>
                  <Item onClick={() => handleToggleModal(scene.url)}>
                    <SVGWrapperStyles
                      id='svgWrapper'
                      ref={imageRef}
                      style={{ width: "100%" }}
                      dangerouslySetInnerHTML={{ __html: svgs?.[index] }}
                    />
                  </Item>
                </Grid>
              ))}
          </Grid>
          <Popup
            forwardRef={imageRef}
            toggleModalSrc={toggleModalSrc}
            handleToggleModal={handleToggleModal}
          />
        </BoxStyled>
      )}
      {!loading && !error && (
        <PaginationStyleWrapper>
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
        </PaginationStyleWrapper>
      )}
    </>
  );
};

export default Main;
