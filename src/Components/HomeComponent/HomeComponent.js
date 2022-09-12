import styles from "./index.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStickyBox } from "react-sticky-box";

import SliderComponent from "./slider/SliderComponent";
import NewMovie from "./newMovie/NewMovie";
import TvShow from "./slidetvshow/TvShow";
import {
  ItemMovieVer,
  ItemMovieHor,
} from "../../common/ItemMovie/ItemMovie";
import SlideNetwork from "./slidenetwork/SlideNetwork";
import LoadingComponent from "../../common/loading/LoadingComponent";
import { Link } from "react-router-dom";

function HomeComponent() {
  const [nowplay, setNowplay] = useState();
  const [toprate, setToprate] = useState();
  const [topweek, setTopweek] = useState();
  const [populate, setPopulate] = useState();
  const [adventures, setAventures] = useState();
  const [comedy, setComedy] = useState();
  const [anime, setAnime] = useState();
  const [tvairingtoday, setTvairingtoday] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const stickyRef = useStickyBox({ offsetTop: 0 });

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `FPT Play - website xem phim trực tuyến`
    setIsLoading(true)
    var promiseMovieNow = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promiseTopRate = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc&primary_release_year=${new Date().getFullYear()}&language=en-US&page=2`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promisePopulate = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promiseTopWeek = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promiseTVAiringToday = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    var promiseAdventure = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=12&sort_by=popularity.desc&page=2`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    var promiseComedy = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=35&sort_by=popularity.desc&page=2`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
    var promiseAnime = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=16&sort_by=popularity.desc&page=3`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    Promise.all([
      promiseMovieNow,
      promiseTopRate,
      promiseTopWeek,
      promisePopulate,
      promiseTVAiringToday,
      promiseAdventure,
      promiseComedy,
      promiseAnime,
    ]).then((result) => {
      setNowplay(result[0].slice(9));
      setToprate(result[1]);
      setTopweek(result[2].slice(0, 5));
      setPopulate(result[3]);
      setTvairingtoday(result[4]);
      setAventures(result[5])
      setComedy(result[6])
      setAnime(result[7])
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }, []);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <LoadingComponent />
      ) : (
          <>
          <SliderComponent list={nowplay} />
          {nowplay && <NewMovie listmovie={populate} />}

          <div className={styles.bodyContainertv}>
            <div className={styles.titleContent}>
              <h1 className={styles.content}>TV Show </h1>
              <Link className={styles.seemore} to={"/tvshow"}>See More...</Link>
            </div>

            {tvairingtoday && <TvShow listtv={tvairingtoday} type="tv" />}
          </div>

          
          <div className={styles.bodyContainertv}>
            <div className={styles.titleContent}>
              <h1 className={styles.content}>Networks</h1>
            </div>
            <SlideNetwork />
          </div>

          <div className={styles.bodyContainer}>
            <div className={styles.bodyLeft}>
              <div className={styles.titleContent}>
              <h1 className={styles.content}>Featured Movies {new Date().getFullYear()}</h1>
              </div>
              <div className={styles.list}>
                {toprate &&
                  toprate.map((item) => (
                    <ItemMovieVer key={item.id} itemmovie={item} />
                  ))}
              </div>
            </div>
            <div ref={stickyRef} className={styles.bodyRight}>
              <div className={styles.titleContent}>
              <h1 className={styles.content}>Week Trending</h1>
              </div>
              {topweek &&
                topweek.map((item) => (
                  <ItemMovieHor key={item.id} movie={item} />
                ))}
            </div>
          </div>

          

          <div className={styles.bodyContainertv}>
            <div className={styles.titleContent}>
              <h1 className={styles.content}>Adventure </h1>
              <Link 
              to={"/genre/Adventure"} 
              className={styles.seemore}
              state= {{
                genreId: 12,
                genreName: 'Adventure',
                }}
              >See More... </Link>
            </div>

            {adventures && <TvShow listtv={adventures} />}
          </div>

          <div className={styles.bodyContainertv}>
            <div className={styles.titleContent}>
              <h1 className={styles.content}>Comedy</h1>
              <Link 
              to={"/genre/Comedy"} 
              className={styles.seemore}
              state= {{
                genreId: 35,
                genreName: 'Comedy',
                }}
              >See More... </Link>
            </div>

            {comedy && <TvShow listtv={comedy} />}
          </div>

          <div className={styles.bodyContainertv}>
            <div className={styles.titleContent}>
              <h1 className={styles.content}>Animation</h1>
              <Link 
              to={"/genre/Animation"} 
              className={styles.seemore}
              state= {{
                genreId: 16,
                genreName: 'Animation',
                }}
              >See More... </Link>
            </div>

            {anime && <TvShow listtv={anime} />}
          </div>

          </>
        
      )}
   </div>
  );
}

export default HomeComponent;
