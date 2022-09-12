import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from 'react-router-dom';

import styles from "./tvshow.module.scss";

function TvShow({ listtv, type }) {

  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 5,
    variableWidth: true,
    arrows: true,
    autoplaySpeed: 3000,
    autoplay: false,
  };


  const replacePage = (name, title, id) => {
    if(type === "tv") {
      if(name === undefined){
        navigate(`/watch-tv/${title.replace(/\s/g, "-")}`, {state: {id: id} ,replace: true })
      }else{
        navigate(`/watch-tv/${name.replace(/\s/g, "-")}`, {state: {id: id} ,replace: true})
      }
    }
    else{
      if(name === undefined){
        navigate(`/watch-movie/${title.replace(/\s/g, "-")}`, {state: {id: id} ,replace: true })
      }else{
        navigate(`/watch-movie/${name.replace(/\s/g, "-")}`, {state: {id: id} ,replace: true})
      }
    }
  }
  return (
    <div className={styles.container}>
      <Slider className={styles.container} {...settings}>
            {listtv.map(item => (
                <div key={item.id} className={styles.itemSlice}>
                <div className={styles.item} onClick={() => replacePage(item.name, item.title, item.id)}>
                  <LazyLoadImage
                    alt=""
                    className={styles.img}
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  ></LazyLoadImage>
                  <div className={styles.desItem}>
                    {item.backdrop_path === null ? 
                    <LazyLoadImage
                      alt=""
                      className={styles.imgdesc}
                      src={`https://media.newyorker.com/photos/61afc08e30ad3736ddaa3e10/master/pass/best_tv_st_felix.png`}
                    ></LazyLoadImage>
                    :
                    <LazyLoadImage
                      alt=""
                      className={styles.imgdesc}
                      src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                    ></LazyLoadImage>
                  }
                    <div className={styles.contentDesc}>
                      {item.name === undefined ? <h1>{item.title}</h1> :
                      <h1>{item.name}</h1>}
                      <p>{(item.overview).slice(0,400)}...</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
}

export default TvShow;
