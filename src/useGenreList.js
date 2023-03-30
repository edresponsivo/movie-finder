import { useState, useEffect } from "react";
import apiConfig from "./apiconfig";

const localCache = {};
const { baseUrl, apiKey } = apiConfig;

export default function useGenreList(mediaType) {
  const [genreList, setGenreList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  // console.log(`mediaType: ${mediaType}`);

  useEffect(() => {
    if (!mediaType) {
      setGenreList([]);
    } else if (localCache[mediaType]) {
      setGenreList(localCache[mediaType]);
    } else if (mediaType === "person") {
      // console.log(`mediaType: ${mediaType}`);
      setGenreList([]);
    } else if (mediaType === "all") {
      // console.log(`mediaType: ${mediaType}`);
      getAllGenreList();
    } else {
      requestGenreList(mediaType);
    }

    async function requestGenreList(type) {
      setGenreList([]);
      setStatus("loading");
      const res = await fetch(
        `${baseUrl}/genre/${type}/list?api_key=${apiKey}`
      );
      const json = await res.json();
      localCache[mediaType] = json.genres || [];
      setGenreList(localCache[mediaType]);
      setStatus("loaded");
    }

    async function getAllGenreList() {
      setGenreList([]);
      setStatus("loading");
      const resTv = await fetch(`${baseUrl}/genre/tv/list?api_key=${apiKey}`);
      const resJsonTv = await resTv.json();
      const resMov = await fetch(
        `${baseUrl}/genre/movie/list?api_key=${apiKey}`
      );
      const resJsonMov = await resMov.json();
      const allJsonConcat = resJsonTv.genres.concat(resJsonMov.genres);
      const sortedArr = allJsonConcat.sort((a, b) => a.id - b.id);
      const cleanSorted = sortedArr.reduce((accu, cur) => {
        let dups = accu.find((item) => {
          return item.id === cur.id;
        });
        if (!dups) {
          accu = accu.concat(cur);
        }
        return accu;
      }, []);
      localCache[mediaType] = cleanSorted || [];
      setGenreList(localCache[mediaType]);
      setStatus("loaded");
    }
  }, [mediaType]);

  return [genreList, status];
}
