import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import YouTube from "react-youtube";
import axios from "axios";
import { Rate } from "antd";
import React, { useState } from "react";

import styles from "./detailmovie.module.scss";
import ListActor from "./listActor/ListActor";
import Reviews from "../../../common/review/Reviews";
import LoadingComponent from "../../../common/loading/LoadingComponent";
import TvShow from "../../HomeComponent/slidetvshow/TvShow";

function DetailMovie() {
  const location = useLocation();
  const [infomovie, setInfomovie] = useState(undefined);
  const [video, setVideo] = useState([]);
  const [cast, setCast] = useState([]);
  const [listreview, setListreview] = useState([]);
  const [listsimilar, setListsimilar] = useState([]);
  const [totalreview, setTotalreview] = useState(0);
  const [showfullcmt, setShowfullcmt] = useState(false);
  const [isloading, setIsloading] = useState(true);


  
  const opts = {
    height: "100%",
    width: "100%",
    controls: "1",
  };

  useEffect(() => {
    setIsloading(true)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    fetchApi();
  }, [location.state.id]);

  const fetchApi = () => {
    var promiseInforMovie = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${location.state.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,keywords`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    var promiseCastMovie = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${location.state.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    var promiseReviews = new Promise(function (resolve, reject) {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${location.state.id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

      var promiseSimilar = new Promise(function (resolve, reject) {
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${location.state.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

    Promise.all([promiseInforMovie, promiseCastMovie,promiseReviews,promiseSimilar])
      .then((res) => {
        setInfomovie(res[0].data);
        setVideo(
          res[0].data.videos.results.find(
            (video, index) => video.type === "Trailer"
          )
        );
        setCast(
          res[1].data.cast.filter((actor) => actor.profile_path !== null)
        );
        setListreview(res[2].data.results)
        setTotalreview(res[2].data.total_results)
        setListsimilar(res[3].data.results)
        document.title = `Movie - ${res[0].data.title}`
        setIsloading(false)

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {" "}
      {isloading ? <LoadingComponent/> : <>
      {infomovie && (
        <div className={styles.container}>
          {infomovie.backdrop_path === null || undefined ? (
            <></>
          ) : (
            <div
              className={styles.backdropImgContainer}
              style={{
                backgroundImage: `linear-gradient(rgba(240, 248, 255, 0), rgb(27, 26, 26)),url('https://image.tmdb.org/t/p/original${infomovie.backdrop_path}')`,
              }}
            ></div>
          )}

          <div className={styles.bodyContainer}>
            <div className={styles.headerMovie}>
              <LazyLoadImage
                alt=""
                src={`https://image.tmdb.org/t/p/w500${infomovie.poster_path}`}
                className={styles.posterMovie}
              />

              <div className={styles.infoMovie}>
                <h1 className={styles.title}>{infomovie.title}</h1>
                <h2 className={styles.originTitle}>
                  {infomovie.original_title}
                </h2>
                <p className={styles.content}>{infomovie.overview}</p>
                <div className={styles.btn}>
                  <a className={styles.btnWatch} href="#trailer">
                    Trailer
                  </a>
                  <a className={styles.btnTrailer}>Play</a>
                </div>
                <div className={styles.intro}>
                  <div className={styles.introLeft}>Release Date</div>
                  <div className={styles.introRight}>
                    {infomovie.release_date}
                  </div>
                  <div className={styles.introLeft}>Rate</div>
                  <div className={styles.introRight}>
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={infomovie.vote_average / 2}
                    />
                  </div>
                  <div className={styles.introLeft}>views</div>
                  <div className={styles.introRight}>
                    {infomovie.popularity}
                  </div>
                  <div className={styles.introLeft}>Countries</div>
                  <div className={styles.introRight}>
                    {infomovie.production_countries.map((country) => {
                      return `${country.name}`;
                    })}
                  </div>
                  <div className={styles.introLeft}>Genre</div>
                  <div className={styles.introRight}>
                    {infomovie.genres.map((genre, index) =>
                      index === infomovie.genres.length - 1
                        ? `${genre.name}`
                        : `${genre.name}, `
                    )}
                  </div>
                  <div className={styles.introLeft}>Run Time</div>
                  <div className={styles.introRight}>
                    {infomovie.runtime} minute
                  </div>
                  <div className={styles.introLeft}>Languages</div>
                  <div className={styles.introRight}>
                    {infomovie.spoken_languages.map((language, index) =>
                      index === infomovie.spoken_languages.length - 1
                        ? `${language.english_name}`
                        : `${language.english_name}, `
                    )}
                  </div>
                  <div className={styles.introLeft}>Companies</div>
                  <div className={styles.introRight}>
                    {infomovie.production_companies.map((compani, index) =>
                      index === infomovie.production_companies.length - 1
                        ? `${compani.name}`
                        : `${compani.name}, `
                    )}
                  </div>
                </div>
              </div>
            </div>

            

            {video === undefined ? (
              <></>
            ) : (
              <div id="trailer" className={styles.movie}>
                <h1 className={styles.titlediv}>TRAILER - {infomovie.title}</h1>

                <YouTube
                  opts={opts}
                  className={styles.ytbTrailer}
                  videoId={`${video.key}`}
                />
              </div>
            )}

            
           <div className={styles.containercmtkeyword}>
            <div className={styles.commentContainer}>
                <p className={styles.commentcount}>Comments {`(${totalreview})`}</p>
                {listreview.length === 0 ? <p className={styles.nocmt}>No comments yet</p> : 
                    <>
                        {listreview.length > 3 ? 
                        <>
                        {showfullcmt === false ? 
                        <>
                            <div>
                                {listreview.slice(0,2).map((reviewdetail, index) => (
                                    <Reviews key={index} reviewdetail={reviewdetail}/>
                                ))}
                            </div>
                            <p className={styles.showmore} onClick={() => {setShowfullcmt(!showfullcmt)}} >Show more </p>   
                        </> 
                        : 
                        <div>
                                {listreview.map((reviewdetail, index) => (
                                    <Reviews key={index} reviewdetail={reviewdetail}/>
                                ))}
                            </div> 
                    }
                    </>
                        
                    :
                    <>
                    {listreview.map((reviewdetail, index) => (
                        <Reviews key={index} reviewdetail={reviewdetail}/>
                    ))}
                    </>
                    
                    }
                    </>
                }
              
            </div>
                
            {infomovie.keywords.keywords.length > 0 && (
                <div className={styles.keywordDiv}>
                {infomovie.keywords.keywords.map((keyword, index) => (
                    <span key={index}>{keyword.name}</span>
                ))}
            </div>
            )}
           </div>

            {cast.length > 0 && (
              <>
                <h1 className={styles.titlediv}>Cast</h1>
                <ListActor cast={cast} />
              </>
            )}

            {listsimilar.length > 0 && (
              <>
                <h1 className={styles.titlediv}>Similar movies</h1>
                {listsimilar && <TvShow listtv={listsimilar} />}
              </>
            )}

          </div>
        </div>
      )}
      </>}
    </>
  );
}

export default DetailMovie;
