import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import YouTube from "react-youtube";
import axios from "axios";
import { Rate, Select } from "antd";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

import styles from "./detailtv.module.scss";
import ListActor from "../detailmovie/listActor/ListActor";
import Reviews from "../../../common/review/Reviews";
import LoadingComponent from "../../../common/loading/LoadingComponent";
import TvShow from "../../HomeComponent/slidetvshow/TvShow";

const { Option } = Select;

function Detailtv() {
  const location = useLocation();
  const [detailtv, setDetailtv] = useState();
  const [trailer, setTrailer] = useState(undefined);
  const [listseason, setListseason] = useState([]);
  const [cast, setcast] = useState([]);
  const [listsimilar, setListsimilar] = useState([]);
  const [showfullseason, setShowfullseason] = useState(false);
  const [isloading, setIsloading] = useState(true);

  const opts = {
    height: "100%",
    width: "100%",
    controls: "1",
  };

  const onChangeGenre = () => {
    alert("ok");
  };

  useEffect(() => {
    setIsloading(true);
    console.log(location.state.id);
    fetchApi();
  }, [location.state.id]);

  const fetchApi = () => {
    var promisedetailtv = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${location.state.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=videos,keywords`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promisecasts = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${location.state.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promisesimilar = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${location.state.id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    var promiseEpisode = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${location.state.id}/season/1?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    Promise.all([promisedetailtv, promisecasts, promisesimilar]).then((res) => {
      setDetailtv(res[0].data);
      setTrailer(
        res[0].data.videos.results.find(
          (video, index) => video.type === "Trailer"
        )
      );
      setListseason(res[0].data.seasons);
      setcast(res[1].data.cast);
      setListsimilar(res[2].data.results);
      setIsloading(false);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <>
      {isloading === true ? (
        <LoadingComponent />
      ) : (
        <>
          <div className={styles.container}>
            {detailtv && (
              <>
                <div
                  className={styles.backdropImgContainer}
                  style={{
                    backgroundImage: `linear-gradient(rgba(240, 248, 255, 0), rgb(27, 26, 26)),url('https://image.tmdb.org/t/p/original${detailtv.backdrop_path}')`,
                  }}
                ></div>

                <div className={styles.bodyContainer}>
                  <div className={styles.headerMovie}>
                    <LazyLoadImage
                      alt=""
                      src={`https://image.tmdb.org/t/p/w500${detailtv.poster_path}`}
                      className={styles.posterMovie}
                    />

                    <div className={styles.infoMovie}>
                      <h1 className={styles.title}>{detailtv.name}</h1>
                      <h2 className={styles.originTitle}>
                        {detailtv.original_name}
                      </h2>
                      <p className={styles.content}>{detailtv.overview}</p>
                      <div className={styles.intro}>
                        <div className={styles.introLeft}>Air Date</div>
                        <div className={styles.introRight}>
                          {detailtv.first_air_date}
                        </div>
                        <div className={styles.introLeft}>Rate</div>
                        <div className={styles.introRight}>
                          <Rate
                            allowHalf
                            disabled
                            defaultValue={detailtv.vote_average / 2}
                          />
                        </div>
                        <div className={styles.introLeft}>views</div>
                        <div className={styles.introRight}>
                          {detailtv.popularity}
                        </div>
                        <div className={styles.introLeft}>Episode Count</div>
                        <div className={styles.introRight}>
                          {detailtv.number_of_episodes}
                        </div>
                        <div className={styles.introLeft}>Season Number</div>
                        <div className={styles.introRight}>
                          {detailtv.number_of_seasons}
                        </div>
                        <div className={styles.introLeft}>Genre</div>
                        <div className={styles.introRight}>
                          {detailtv.genres.map((genre, index) =>
                            index === detailtv.genres.length - 1
                              ? `${genre.name}`
                              : `${genre.name}, `
                          )}
                        </div>
                        <div className={styles.introLeft}>Run Time</div>
                        <div className={styles.introRight}>
                          {detailtv.episode_run_time[0]} minutes
                        </div>
                        <div className={styles.introLeft}>Languages</div>
                        <div className={styles.introRight}>
                          {detailtv.spoken_languages.map((language, index) =>
                            index === detailtv.spoken_languages.length - 1
                              ? `${language.name}`
                              : `${language.name}, `
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {trailer === undefined ? (
                    <></>
                  ) : (
                    <div id="trailer" className={styles.movie}>
                      <h2 className={styles.titlediv}>
                        TRAILER - {detailtv.name}
                      </h2>

                      <YouTube
                        opts={opts}
                        className={styles.ytbTrailer}
                        videoId={`${trailer.key}`}
                      />
                    </div>
                  )}

                  <div className={styles.seasonAndEpisode}>
                    <div className={styles.seasion}>
                      {detailtv.last_episode_to_air !== null && (
                        <>
                          <h2 className={styles.titlediv}>
                            Last episode to air
                          </h2>
                          <div className={styles.detailEpisode}>
                            {detailtv.last_episode_to_air.still_path ===
                            null ? (
                              <LazyLoadImage
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${detailtv.backdrop_path}`}
                                className={styles.postertv}
                              />
                            ) : (
                              <LazyLoadImage
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${detailtv.last_episode_to_air.still_path}`}
                                className={styles.postertv}
                              />
                            )}

                            <div className={styles.inforMovie}>
                              <h1 className={styles.title}>
                                {detailtv.last_episode_to_air.name}
                              </h1>
                              <h3 className={styles.oreview}>
                                {detailtv.last_episode_to_air.air_date}
                              </h3>
                              <h3 className={styles.oreview}>
                                {detailtv.last_episode_to_air.overview.slice(
                                  0,
                                  150
                                )}
                                ...
                              </h3>
                            </div>
                          </div>
                        </>
                      )}

                      {detailtv.next_episode_to_air !== null && (
                        <>
                          <h2 className={styles.titlediv}>
                            Next episode to air
                          </h2>
                          <div className={styles.detailEpisode}>
                            {detailtv.next_episode_to_air.still_path ===
                            null ? (
                              <LazyLoadImage
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${detailtv.backdrop_path}`}
                                className={styles.postertv}
                              />
                            ) : (
                              <LazyLoadImage
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${detailtv.next_episode_to_air.still_path}`}
                                className={styles.postertv}
                              />
                            )}

                            <div className={styles.inforMovie}>
                              <h1 className={styles.title}>
                                {detailtv.next_episode_to_air.name}
                              </h1>
                              <h3 className={styles.oreview}>
                                {detailtv.next_episode_to_air.air_date}
                              </h3>
                              <h3 className={styles.oreview}>
                                {detailtv.next_episode_to_air.overview.slice(
                                  0,
                                  150
                                )}
                                ...
                              </h3>
                            </div>
                          </div>
                        </>
                      )}

                      {listseason.length !== 0 && (
                        <>
                          <h2 className={styles.titlediv}>Seasons</h2>
                          {listseason.length > 2 ? (
                            <>
                              {showfullseason === false ? (
                                <>
                                  {listseason.slice(0, 2).map((item, index) => (
                                    <div key={index}>
                                      <div className={styles.detailEpisode}>
                                        {item.poster_path === null ? (
                                          <LazyLoadImage
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500${detailtv.poster_path}`}
                                            className={styles.postertv}
                                          />
                                        ) : (
                                          <LazyLoadImage
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            className={styles.postertv}
                                          />
                                        )}

                                        <div className={styles.inforMovie}>
                                          <h1 className={styles.title}>
                                            {item.name} | {item.episode_count}{" "}
                                            Episode
                                          </h1>
                                          <h3 className={styles.oreview}>
                                            {item.air_date}
                                          </h3>
                                          {item.overview === "" ? (
                                            <h3 className={styles.oreview}>
                                              {item.name} of {detailtv.name}{" "}
                                              premiered on {item.air_date}
                                            </h3>
                                          ) : (
                                            <h3 className={styles.oreview}>
                                              {item.overview.slice(0, 150)}...
                                            </h3>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <p
                                    className={styles.showmore}
                                    onClick={() =>
                                      setShowfullseason(!showfullseason)
                                    }
                                  >
                                    Show more
                                  </p>
                                </>
                              ) : (
                                <>
                                  {listseason.map((item, index) => (
                                    <div key={index}>
                                      <div className={styles.detailEpisode}>
                                        {item.poster_path === null ? (
                                          <LazyLoadImage
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500${detailtv.poster_path}`}
                                            className={styles.postertv}
                                          />
                                        ) : (
                                          <LazyLoadImage
                                            alt=""
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            className={styles.postertv}
                                          />
                                        )}

                                        <div className={styles.inforMovie}>
                                          <h1 className={styles.title}>
                                            {item.name} | {item.episode_count}{" "}
                                            Episode
                                          </h1>
                                          <h3 className={styles.oreview}>
                                            {item.air_date}
                                          </h3>
                                          {item.overview === "" ? (
                                            <h3 className={styles.oreview}>
                                              {item.name} of {detailtv.name}{" "}
                                              premiered on {item.air_date}
                                            </h3>
                                          ) : (
                                            <h3 className={styles.oreview}>
                                              {item.overview.slice(0, 150)}...
                                            </h3>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {listseason.map((item, index) => (
                                <div key={index}>
                                  <div className={styles.detailEpisode}>
                                    {item.poster_path === null ? (
                                      <LazyLoadImage
                                        alt=""
                                        src={`https://image.tmdb.org/t/p/w500${detailtv.poster_path}`}
                                        className={styles.postertv}
                                      />
                                    ) : (
                                      <LazyLoadImage
                                        alt=""
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        className={styles.postertv}
                                      />
                                    )}

                                    <div className={styles.inforMovie}>
                                      <h1 className={styles.title}>
                                        {item.name} | {item.episode_count}{" "}
                                        Episode
                                      </h1>
                                      <h3 className={styles.oreview}>
                                        {item.air_date}
                                      </h3>
                                      {item.overview === "" ? (
                                        <h3 className={styles.oreview}>
                                          {item.name} of {detailtv.name}{" "}
                                          premiered on {item.air_date}
                                        </h3>
                                      ) : (
                                        <h3 className={styles.oreview}>
                                          {item.overview.slice(0, 150)}...
                                        </h3>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </div>

                    <div className={styles.infortv}>
                      {detailtv.created_by.length !== 0 && (
                        <>
                          <h2 className={styles.titleinfor}>Creator</h2>
                          {detailtv.created_by &&
                            detailtv.created_by.map((item, index) => (
                              <div className={styles.inforItem} key={index}>
                                {item.profile_path === null ? (
                                  <LazyLoadImage
                                    alt=""
                                    src="https://png.pngtree.com/png-vector/20190221/ourlarge/pngtree-female-user-vector-avatar-icon-png-image_691506.jpg"
                                    className={styles.imageCreator}
                                  ></LazyLoadImage>
                                ) : (
                                  <LazyLoadImage
                                    alt=""
                                    src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                    className={styles.imageCreator}
                                  ></LazyLoadImage>
                                )}
                                <h2 className={styles.nameCreater}>
                                  {item.name}
                                </h2>
                              </div>
                            ))}
                        </>
                      )}

                      {detailtv.networks.length !== 0 && (
                        <>
                          <h2 className={styles.titleinfor}>Network</h2>
                          <div className={styles.inforItem}>
                            {detailtv.networks.map((item, index) => (
                              <LazyLoadImage
                                key={index}
                                alt=""
                                src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                                className={styles.imageNetwork}
                              ></LazyLoadImage>
                            ))}
                          </div>
                        </>
                      )}

                      {detailtv.keywords.results.length !== 0 && (
                        <>
                          <h2 className={styles.titleinfor}>Keyword</h2>
                          <div className={styles.inforItem}>
                            {detailtv.keywords.results.map((item, index) => (
                              <span key={index} className={styles.itemkeywork}>
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </>
                      )}

                      <h2 className={styles.titleinfor}>Status</h2>
                      <div className={styles.inforItem}>
                        <h2 className={styles.typeStatus}>{detailtv.status}</h2>
                      </div>
                      <h2 className={styles.titleinfor}>Type</h2>
                      <div className={styles.inforItem}>
                        <h2 className={styles.typeStatus}>{detailtv.type}</h2>
                      </div>
                    </div>
                  </div>
                  {cast.length > 0 && (
                    <>
                      <h2 className={styles.titlediv}>Cast</h2>
                      <ListActor cast={cast} />
                    </>
                  )}

                  {listsimilar.length > 0 && (
                    <>
                      <h2 className={styles.titlediv}>Similar tv</h2>
                      {listsimilar && <TvShow listtv={listsimilar} type="tv" />}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Detailtv;
