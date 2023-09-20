import "./style.scss";

import React, { useState } from "react";

import CircleRating from "../../../components/circleRating/CircleRating";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import Img from "../../../components/lazyLoading/Img";
import { PlayIcon } from "../PlayButton";
import PosterFallback from "../../../assets/no-poster.png";
import VideoPopup from "../../../components/videoPopup/VidoePopup";
import dayjs from "dayjs";
import UseFetch from "../../../hooks/UseFetch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const { mediaType, id } = useParams();
  const { data, loading } = UseFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);
  const genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((c) => c.job === "Director");
  const writer = crew?.filter(
    (c) => c.job === "Writer" || c.job === "Screenplay" || c.job === "Story"
  );

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity_layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        src={url.backdrop + data?.poster_path}
                        className="posterImg"
                      />
                    ) : (
                      <Img src={PosterFallback} className="posterImg" />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />
                      <div
                        className="playbtn"
                        onClick={() => {
                          setShow(true), setVideoId(video.key);
                        }}
                      >
                        <PlayIcon />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {(data.release_date || data.first_air_date) && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(
                              data?.release_date || data.first_air_date
                            ).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {(data.episode_run_time || data.runtime) && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(
                              data.episode_run_time || data.runtime
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    {director.length > 0 && (
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {director.map((d, indx) => {
                            return (
                              <span key={indx}>
                                {d.name}
                                {director.length - 1 != indx && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {writer.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((d, indx) => {
                            return (
                              <span key={indx}>
                                {d.name}
                                {writer.length - 1 != indx && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                    {data.created_by > 0 && (
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {data.created_by.map((d, indx) => {
                            return (
                              <span key={indx}>
                                {d.name}
                                {writer.length - 1 != indx && ", "}
                              </span>
                            );
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  videoId={videoId}
                  setVideoId={setVideoId}
                  setShow={setShow}
                  show={show}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
