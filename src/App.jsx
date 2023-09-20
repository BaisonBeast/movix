import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getApiConfigration, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import Footer from "./components/footer/Footer";
import Header from "./components/header/header";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import SearchResult from "./pages/searchResult/SearchResult";
import { fetchDataFromApi } from "./utils/api";

function App() {
  const dispatch = useDispatch();
  //const { url } = useSelector((state) => state.home);

  useEffect(() => {
    ferchApiConfig();
    genresCall();
  }, []);

  const ferchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then((result) => {
        console.log(result);
        const url = {
          backdrop: result.images.secure_base_url + "original",
          poster: result.images.secure_base_url + "original",
          profile: result.images.secure_base_url + "original",
        };
        dispatch(getApiConfigration(url));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const genresCall = async () => {
    const promises = [];
    const endPoints = ['movie', 'tv'];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    })
    const data = await Promise.all(promises)
    console.log(data);
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item))
    })
    console.log(allGenres)
    dispatch(getGenres(allGenres));
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:querry" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
