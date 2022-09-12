import { Rate } from "antd";
import { TiEye } from "react-icons/ti";
import { IoIosPlay } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

import styles from './itemmovie.module.scss';

export function ItemMovieVer({ itemmovie }) {

  const navigate = useNavigate();

    return ( 
        <div className={styles.item} onClick={() => {navigate(`/watch-movie/${itemmovie.title.replace(/\s/g, "-")}`, {state: {id: itemmovie.id}})}}>
         <div className={styles.divItem}>
          {itemmovie.poster_path === null ? 
          <>
          <LazyLoadImage 
          className={styles.imgItem}
          alt=""
          effect="opacity"
          src={`https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg?ver=6`}/>
          <div className={styles.layer}>
            <IoIosPlay className={styles.icplay}/>
          </div>
          </>
          :
         <>
         <LazyLoadImage 
            className={styles.imgItem}
            alt=""
            effect="opacity"
            src={`https://image.tmdb.org/t/p/w500/${itemmovie.poster_path}`}/>
            <div className={styles.layer}>
            <IoIosPlay className={styles.icplay}/>
          </div>
            </>
          }
          <div className={styles.node}>
              {typeof itemmovie.release_date === "string" && <>
              {Number(itemmovie.release_date.slice(0,4)) === new Date().getFullYear() ? <p className={styles.adult}>New</p> : <></>}
              </>}
          
              {itemmovie.adult === true ? <p className={styles.adult}>18+</p> : <></>}
          </div>
         </div>
            
          <div className={styles.infor}>
            <h2 className={styles.originalTitleItem}>{itemmovie.title}</h2>
            <p className={styles.titleItem}>{itemmovie.original_title}</p>
            <div className={styles.rateAndLine}>
              {itemmovie.popularity < 1 ? 
              null 
              :
              <p>
                <TiEye className={styles.icEye} /> {itemmovie.popularity.toFixed(1)}k
              </p>
            }
              <Rate className={styles.rate} allowHalf disabled defaultValue={itemmovie.vote_average / 2} />
              
            </div>
          </div>
        </div>
     );
}

export function ItemMovieHor({movie}) {

  const navigate = useNavigate();

  return (
    <div className={styles.itemHor} onClick={() => {navigate(`/watch-movie/${movie.title.replace(/\s/g, "-")}`, {state: {id: movie.id}})}}>
        <LazyLoadImage
          className={styles.imgItemHor}
          alt=""
          src={` https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        />
        <div className={styles.inforItemHor}>
            <h2 className={styles.originalTitleItemItemHor}>{movie.original_title}</h2>
            <div className={styles.rateAndLineItemHor}>
            <p>{(movie.release_date).slice(0,4)}</p>
            <p> 
                 {Math.floor(movie.popularity)}k Views
              </p>
              
              <Rate className={styles.rateItemHor} allowHalf disabled defaultValue={movie.vote_average / 2} />
            </div>
          </div>
    </div>
  );
}
