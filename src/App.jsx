import { useState, useEffect } from "react";
import apiConfig from "./apiconfig";
import Results from "./Results";
import useGenreList from "./useGenreList";

const TRENDING_CHOICES = ["all", "tv", "movie", "person"];

const { imgBaseUrl, baseUrl, apiKey } = apiConfig;

const App = () => {
  const [mediaType, setMediaType] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [persons, setPersons] = useState([]);
  const [genres] = useGenreList(mediaType);

  // console.log(genres);

  useEffect(() => {
    requestMovies();
  }, []);

  useEffect(() => {
    if (mediaType !== "person") {
      requestMovies();
    } else {
      requestPersons();
    }
  }, [mediaType]);

  async function requestMovies() {
    const response = await fetch(
      `${baseUrl}/trending/all/day?api_key=${apiKey}`
    );
    // console.log(`${baseUrl}/trending/all/day?api_key=${apiKey}`);
    const responseJson = await response.json();
    // console.log(responseJson);
    setMovies(responseJson.results);
    setPersons([]);
  }

  async function requestPersons() {
    const res = await fetch(`${baseUrl}/trending/person/day?api_key=${apiKey}`);
    const resJson = await res.json();
    setPersons(resJson.results);
    setMovies([]);
  }

  const handleMediaTypeChange = (e) => {
    const typeSelected = e.target.value;
    if (typeSelected === "person") {
      requestPersons();
    } else {
      setMediaType(e.target.value);
      setGenre("");
    }
  };

  return (
    <>
      <header>
        <h1>Trending Movies</h1>
      </header>
      <section>
        <div className="search-params">
          <form>
            <label htmlFor="mediaType">Media Type</label>
            <select
              name="mediaType"
              id="mediaType"
              value={mediaType}
              onChange={(e) => handleMediaTypeChange(e)}
            >
              <option />
              {TRENDING_CHOICES.map((choice) => (
                <option key={choice}>{choice}</option>
              ))}
            </select>
            <label htmlFor="genre">Genre</label>
            <select
              name="genre"
              id="genre"
              disabled={!genres.length}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option />
              {genres.map((genre) => (
                <option key={genre.id}>{genre.name}</option>
              ))}
            </select>
            <button
              className="btn"
              type="submit"
              onClick={() => console.log("submitting")}
            >
              Submit
            </button>
          </form>
        </div>
      </section>
      <Results movies={movies} persons={persons} />
    </>
  );
};
export default App;
