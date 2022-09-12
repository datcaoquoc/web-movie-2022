import { LazyLoadImage } from "react-lazy-load-image-component";
import { IoIosPlay } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

import styles from "./itemtvshow.module.scss";

function ItemTvshow({ tv }) {

  const navigate = useNavigate();

  return (
    <div className={styles.container} 
    onClick={() => {navigate(`/watch-tv/${tv.name.replace(/\s/g, "-")}`, {state: {id: tv.id}})}}>
      {tv.backdrop_path === null ? (
        <LazyLoadImage
          className={styles.image}
          alt=""
          src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
        />
      ) : (
        <LazyLoadImage
          className={styles.image}
          alt=""
          src={`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`}
        />
      )}
      <p className={styles.title}>{tv.name}</p>
      <div className={styles.layer}>
        <IoIosPlay className={styles.icplay} />
      </div>
    </div>
  );
}

export default ItemTvshow;
