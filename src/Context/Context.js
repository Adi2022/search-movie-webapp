import { createContext, useContext, useEffect, useState } from "react";

// context- warehouse
// create conetxt
// Provider - Delivery Boy
// Consumer is replaced by useContext Hook...- you

export const API_URL = `https://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}`;
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [query, setQuery] = useState("batman");
  const getAllMovies = async (url) => {

    setIsLoading(true)
   
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({
          show: false,
          msg: data.Error,
        });
      } else {
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getAllMovies(`${API_URL}&s=${query}`);
    }, 500);

    return () => clearTimeout(timerOut);
  }, [query]);

  

  return (
    <AppContext.Provider value={{ isLoading, isError, movie, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

// Global Custom Hook..

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
