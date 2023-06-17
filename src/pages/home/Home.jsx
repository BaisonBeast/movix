import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import React from "react";

function Home() {
  return (
    <div className="homePage">
      <HeroBanner />
    </div>
  );
}

export default Home;
