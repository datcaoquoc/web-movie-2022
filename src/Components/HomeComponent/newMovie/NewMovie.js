import styles from "./newmovie.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate } from "antd";
import { TiEye } from "react-icons/ti";
import React, { useRef } from 'react';
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from 'react-router-dom';

function NewMovie({listmovie}) {
  const navigate = useNavigate();
  const sliderRef = useRef();


  const gotoNext = () => {
    sliderRef.current.slickNext();
  }

  const gotoPrev = () => {
    sliderRef.current.slickPrev();
}

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    variableWidth: true,
    autoplaySpeed: 2000,
    autoplay: true,
    arrows: false
  };

  return (
    <div className={styles.container}>
      <div className={styles.divContainer}>
       <TbChevronLeft className={styles.leftArrow} onClick={gotoPrev}/>
                <TbChevronRight className={styles.rightArrow} onClick={gotoNext}/>
      <Slider ref={sliderRef} className={styles.container} {...settings}>
        {listmovie && listmovie.map(i => (
          <div key={i.id} className={styles.item} onClick={() => {navigate(`/watch-movie/${i.title.replace(/\s/g, "-")}`, {state: {id: i.id}})}}>
            <div className={styles.itemDiv}>
            <LazyLoadImage
            className={styles.imgItem}
            alt=""
            src={`https://image.tmdb.org/t/p/w500/${i.poster_path}`}
          ></LazyLoadImage>

          <div className={styles.infor}>
              <h2 className={styles.titleItem}>{i.original_title}</h2>
            <div className={styles.rateAndLine}>
            <Rate className={styles.rate} disabled defaultValue={i.vote_average / 2} />
            <p>
                <TiEye className={styles.icEye} /> {Math.round(i.popularity)}k
              </p>
              
              
            </div>
          </div>
        </div>
        </div>
        ))}
       
      </Slider>
      </div>
    </div>
  );
}

export default NewMovie;
