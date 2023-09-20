import "./style.scss";

import Cast from "../cast/Cast";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recomendation";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import React from "react";
import VideosSection from "./videosSection/VideosSection";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creaditLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={credits?.crew} />
      <Cast data={credits.cast} loading={creaditLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  );
}

export default Details;
