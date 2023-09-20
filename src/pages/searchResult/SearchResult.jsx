import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.scss";
import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from "../../components/spinner/Spinner";
import noResult from "../../assets/no-results.png";
import { useParams } from "react-router-dom";

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const { querry } = useParams();

  const fetchInitailData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${querry}&page=${pageNumber}`).then(
      (res) => {
        setData(res);
        setPageNumber((prev = prev + 1));
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${querry}&page=${pageNumber}`).then(
      (res) => {
        if (data.results) {
          setData({
            ...data,
            results: [...data?.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNumber((prev = prev + 1));
      }
    );
  };

  useEffect(() => {
    setPageNumber(1);
    fetchInitailData();
  }, [querry]);

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.total_results > 1 ? "results" : "result"
                } of ${querry}`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}
                next={fetchNextPageData}
                hadMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data.results.map((item, indx) => {
                  if(item.media_type === 'person') return;
                  return (
                    <MovieCard key={indx} data={item} fromSearch={true}/>
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Result not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
}

export default SearchResult;
