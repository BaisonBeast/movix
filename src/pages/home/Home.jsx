import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import React from "react";
import TopRated from './topRated/TopRated';
import Trending from "./trending/Trending";

function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
}

export default Home;
