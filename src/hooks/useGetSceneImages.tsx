import axios from "axios";
import { useState, useEffect } from "react";
import randomColor from "randomcolor";
import { ISceneGroups } from "../@types/api/apiScenesGroup";

type TGetSceneImages = {
  page: number;
};

const useGetSceneImages = ({ page }: TGetSceneImages) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [scenes, setScenes] = useState<ISceneGroups[] | undefined>();

  //pagination variables
  const PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [currentData, setCurrentData] = useState<ISceneGroups[] | undefined>();

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://img.pixton.com/data/comic-scene-group-data.json"
        );
        const sceneGroups = response.data.data.sceneGroups;

        sceneGroups.forEach((object: ISceneGroups) => {
          object.color = randomColor();
        });
        setScenes(sceneGroups);
      } catch (error: unknown) {
        setError("Failure to fetch data, Please Try Again or contact support");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //pagination logic - set current data (images) displayed dependent on page
  useEffect(() => {
    if (scenes?.length) {
      const count = Math.ceil(scenes.length / PER_PAGE);
      setCount(count);

      const begin = (currentPage - 1) * PER_PAGE;
      const end = begin + PER_PAGE;
      const data = scenes.slice(begin, end);
      setCurrentData(data);
    }
  }, [scenes, currentPage]);

  //pagination logic - set current page
  useEffect(() => {
    const pageNumber = Math.max(1, page);
    setCurrentPage(() => Math.min(pageNumber, count));
  }, [page, count]);

  return {
    scenes,
    loading,
    error,
    currentData,
    count,
  };
};

export default useGetSceneImages;
