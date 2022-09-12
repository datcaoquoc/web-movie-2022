import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate } from "antd";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from "./slider.module.scss";

function SliderComponent({list}) {
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
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    adaptiveHeight: true,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: true,
    centerMode: true,
    fade: true,
    centerPadding: "0px",
  };
  return (
    <div className={styles.ctn}>
      <div className={styles.slickbtn}>
          <div className={styles.iconslick} onClick={gotoPrev}>
            <TbChevronLeft className={styles.icon}/>
          </div>
           
          <div className={styles.iconslick} onClick={gotoNext}>
            <TbChevronRight className={styles.icon}/>
          </div>
      </div>
    <Slider ref={sliderRef} className={styles.container} {...settings}>

          {list && list.map(item => (
             <div key={item.id} className={styles.slideItem}>
             <div
               className={styles.backgroundSlide}
               style={{
                 backgroundImage:
                   `linear-gradient(rgb(14, 14, 14),rgba(240, 248, 255, 0), rgb(27, 26, 26)),url('https://image.tmdb.org/t/p/w500/${item.backdrop_path}')`,
               }}
             ></div>
             <div className={styles.contentSlide}>
               <div className={styles.imageSlide}>
                 <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}></img>
               </div>
               <div className={styles.titleImage}>
                 <h1 className={styles.titleMovie}>
                   {item.original_title}
                 </h1>
                 <div className={styles.rate}>
                   <span className={styles.lableRate}>Rate :</span>
                   <Rate allowHalf  disabled defaultValue={item.vote_average / 2} />
                 </div>
                 <p className={styles.descMovie}>
                   {item.overview}
                 </p>
                 <div className={styles.divBtn}>
                   <button  className={styles.btnMovie}>Play</button>
                   <button className={styles.btnMovie}>Trailer</button>
                 </div>
               </div>
             </div>
           </div>
          ))}
    </Slider>
    </div>
  );
}

export default SliderComponent;
