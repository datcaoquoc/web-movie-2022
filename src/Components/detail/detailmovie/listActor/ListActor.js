import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./listactor.module.scss";


function ListActor({ cast }) {

  

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 5,
    variableWidth: true,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: false,
  };


  return (
    <div className={styles.container}>
      <Slider className={styles.container} {...settings}>
        {cast.map((actor,index) => (
          <div className={styles.itemSlide} key={index}>
          <div className={styles.itemSlide}>
            <div className={styles.imgActor}>
            <LazyLoadImage
              alt={actor.profile_path}
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              className={styles.img}
            />
            <p className={styles.inforActor}>{actor.character}</p>
            </div>
            <h2 className={styles.nameActor}>{actor.name}</h2>
          </div>
        </div>
        ))}
      </Slider>
    </div>
  );
}

export default ListActor;
