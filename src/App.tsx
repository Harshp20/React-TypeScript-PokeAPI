import { useEffect, useState } from "react";
import axios, { Canceler } from "axios";
import Pagination from "./components/Pagination";
import Pokemons from "./components/Pokemons";

export default function App() {
  const baseUrl = process.env.REACT_APP_BASE_URL as string;
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(baseUrl);
  const [prevPageUrl, setPrevPageUrl] = useState("");
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [isPrevPageAvailable, setIsPrevPageAvailable] = useState(false);
  const [isNextPageAvailable, setIsNextPageAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    let cancel: Canceler;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken(
          (cancelToken) => (cancel = cancelToken)
        ),
      })
      .then(({ data: { results, previous, next } }) => {
        setPokemons(results);
        setPrevPageUrl(previous);
        setNextPageUrl(next);
        setIsPrevPageAvailable(previous ? true : false);
        setIsNextPageAvailable(next ? true : false);
        setIsLoading(false);
      });

    return () => cancel();
  }, [currentPageUrl]);

  const goToPreviousPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  const goToNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  return (
    <>
      <div style={{ height: "37rem" }}>
        {isLoading ? "Loading..." : <Pokemons pokemons={pokemons} />}
      </div>
      <Pagination
        isPrevPageAvailable={isPrevPageAvailable}
        isNextPageAvailable={isNextPageAvailable}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
      />
    </>
  );
}
