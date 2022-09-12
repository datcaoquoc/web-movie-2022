import { useParams, useLocation  } from "react-router-dom";
import { Breadcrumb, Carousel } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { AiFillCaretDown } from "react-icons/ai";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "./moviebygenre.module.scss";
import { years } from "../../common/fakedata/sort";
import { useLayoutEffect, useRef, useState } from "react";
import LoadMoreComponent from "../../common/loadmore/LoadMoreCompoent";
import { ItemMovieVer } from '../../common/ItemMovie/ItemMovie'

const { Option } = Select;

let hasmore = true;

function MovieByGenre() {
  let { genreName } = useParams();
  const location = useLocation();
  const [listmovie, setListmovie] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const page = useRef(1);
  const filterValue = useRef({sort: "",year: "" });

  useLayoutEffect(()=>{
    window.scrollTo(0, 0)
    page.current = 1;
    filterValue.current.sort = "";
    filterValue.current.year = "";
    hasmore = true;
    setListmovie([])
    getListMovie()

  },[location.state.genreId])

  const getListMovie = () => {
    const { sort, year } = filterValue.current;
    var promiseComedy = new Promise(function (resolve, reject) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=${location.state.genreId}&sort_by=${sort}&primary_release_year=${year}&page=${page.current}`
        )
        .then((res) => {
          resolve(res.data.results);
        })
        .catch((err) => {
          reject(err);
        });
    });

    promiseComedy.then(result => {
      result.length < 20 && (hasmore = false)
      result.length >= 20 && (hasmore = true)
      if(Number(page.current) === 1) {
        setListmovie(result)
      }else{
        setListmovie([...listmovie,...result])
      }
      setIsloading(false)
    })
  }

  const onChangeSortBy = (value) => {
    filterValue.current.sort = value
  };
  const onChangeYear = (value) => {
    filterValue.current.year = value
  };
  const nextData = () => {
    page.current += 1;
    getListMovie();
  }


  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <Breadcrumb className={styles.breadcrumbItem}>
          <Breadcrumb.Item >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            Movies
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            {location.state?.genreName}
          </Breadcrumb.Item>
        </Breadcrumb>

        <Carousel autoplay dots={false}>
        <img className={styles.banner} src="https://truyenhinhkplusvn.com/wp-content/uploads/2019/09/Banner-Phim-Vi%E1%BB%87t-Cha-Ma.jpg"></img>
        <img className={styles.banner} src="https://kplus-website-production-cdn.azureedge.net/content/upload/1/root/house-of-the-dragon-poster-2152x538_w1280_h1280.jpg"></img>
        <img className={styles.banner} src="https://media.lottecinemavn.com/Media/WebAdmin/fb117953b0934554b7c637d0460046b9.jpg"></img>
        </Carousel>

        <div className={styles.bodyContainer1}>

            <Select
                suffixIcon={<AiFillCaretDown className={styles.suffixIcon}/>}
                className={styles.sortSelect}
                size="large"
                style={{ width: 200 }}
                placeholder="Sort"
                optionFilterProp="children"
                onChange={onChangeSortBy}
                defaultValue={{ value: "", label: "All" }}
            >
              <Option value="">All</Option>
              <Option value="popularity.desc">Popular DESC</Option>
              <Option value="popularity.asc">Popular ASC</Option>
              <Option value="vote_average.asc">Rating ASC</Option>
              <Option value="vote_average.desc">Rating DESC</Option>
              <Option value="release_date.asc">Release Date ASC</Option>
              <Option value="release_date.desc">Release Date DESC</Option>
            </Select>
            <Select
                className={styles.sortSelect}
                suffixIcon={<AiFillCaretDown className={styles.suffixIcon} />}
                style={{ width: 100 }}
                size="large"
                placeholder="Select a sort"
                optionFilterProp="children"
                onChange={onChangeYear}
                defaultValue={{ value: "", label: "Year" }}
            >
                <Option value="">Year</Option>
              {years.map(year => (
                <Option key={year} value={year}>{year}</Option>
              ))}
            </Select>

            <button onClick={()=> {
              page.current = 1;
              setIsloading(true)
              getListMovie()
            }} className={styles.btnfilter}>Filter Movie</button>


        </div>

        {isloading ? <LoadMoreComponent/> : 
        <InfiniteScroll
          className={styles.listMovie}
          dataLength={listmovie.length}
          next={nextData}
          loader={<LoadMoreComponent/>}
          hasMore={hasmore}
          endMessage={
            <></>
          }
        >
            {listmovie.map((item, index) => (
              <div key={index}>
              {item.poster_path !== null ? <div key={index} className={styles.itemlist}>
              <ItemMovieVer itemmovie={item}/>
              
            </div> : null}</div>
                
            ))}

        </InfiniteScroll>
        }
      </div>
    </div>
  );
}

export default MovieByGenre;
