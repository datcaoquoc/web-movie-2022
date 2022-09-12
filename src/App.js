import "normalize.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";

import Globalstyle from "./GlobalStyle";
import HomeComponent from "./Components/HomeComponent/HomeComponent";
import HeaderComponent from "./common/Header/HeaderComponent";
import FooterComponent from "./common/footer/FooterComponent.js";
import MovieByGenre from "./Components/MovieByGenre/MovieByGenre";
import Tvshow from "./Components/tvshow/Tvshow";
import Search from "./Components/search/Search";
import DetailMovie from "./Components/detail/detailmovie/DetailMovie";
import Detailtv from "./Components/detail/detailtv/Detailtv";
import { useEffect } from "react";

function App() {
  return (
    <Globalstyle>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />}></Route>
          <Route path="/genre/:genreName" element={<MovieByGenre />}></Route>
          <Route path="/tvshow" element={<Tvshow />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/watch-movie/:name" element={<DetailMovie />}></Route>
          <Route path="/watch-tv/:name" element={<Detailtv />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <FooterComponent />
      </Router>
    </Globalstyle>
  );
}

export default App;
