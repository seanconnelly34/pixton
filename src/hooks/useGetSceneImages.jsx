import axios from "axios";
import { useState, useEffect } from "react";
import randomColor from "randomcolor";

const useFetchSceneGImages = ({ page }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [scenes, setScenes] = useState();

  //pagination variables
  const PER_PAGE = 24;
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState();
  const [currentData, setCurrentData] = useState();

  //fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://img.pixton.com/data/comic-scene-group-data.json"
        );
        const sceneGroups = response.data.data.sceneGroups;

        sceneGroups.forEach((object) => {
          object.color = randomColor();
        });
        setScenes(sceneGroups);
      } catch (error) {
        setError(error);
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

export default useFetchSceneGImages;
