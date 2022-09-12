import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { Select } from "antd";

import { ItemMovieVer } from "../../common/ItemMovie/ItemMovie";
import ItemTvshow from "../../common/itemTvshow/ItemTvshow";
import styles from "./search.module.scss";
import LoadMoreComponent from "../../common/loadmore/LoadMoreCompoent";

const { Option } = Select;

let hasmore = true;

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    let keyword = searchParams.get("q").replace(/-/g, " ");
    const [listkeyword, setListkeyword] = useState([])
    const [listresult, setListresult] = useState([])
    const [isloading, setIsloading] = useState(true)
    const [resulttotal, setResulttotal] = useState(0)
    const [totalpage, setTotalpage] = useState(1)
    const type = useRef("movie")
    const page = useRef(1);

  useEffect(() => {
    window.scrollTo(0, 0)
    setListresult([])
    setIsloading(true)
    page.current = 1;
    hasmore = true;
    getApi()
  }, [keyword]);

  const onChangeType = (value) => {
    setIsloading(true)
    setListresult([])
    type.current = value
    page.current = 1;
    // setListresult([])
    window.scrollTo(0, 0)
    getApi();
};


const nextData = () => {
    page.current += 1;
    getApi();
}

  const getApi = () => {
    var promiseKeywords = new Promise(function (resolve, reject) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&query=${keyword}&page=1`
          )
          .then((res) => {
            resolve(res.data.results);
          })
          .catch((err) => {
            reject(err);
          });
      });
    
      var promiseResult = new Promise(function (resolve, reject) {
        axios
          .get(
            `https://api.themoviedb.org/3/search/${type.current}?api_key=${process.env.REACT_APP_API_KEY}&query=${keyword}&page=${page.current}&include_adult=true`
          )
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });

    Promise.all([promiseKeywords,promiseResult]).then(res => {
        console.log(page.current)
        setListkeyword([...res[0]])


        if(page.current === 1){
            setListresult(res[1].data.results)
            if(res[1].data.total_pages === 1){
                hasmore = false
            } 
        }else{
            setListresult([...listresult, ...res[1].data.results])
            if(page.current === totalpage){
                hasmore = false
            }
        }
        
        setResulttotal(res[1].data.total_results)
        setTotalpage(res[1].data.total_pages)
        setIsloading(false)
    })
    .catch(err => {
        console.log(err)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleSearch}>Search results : {keyword}</h1>

          <Select
            suffixIcon={<AiFillCaretDown className={styles.suffixIcon} />}
            className={styles.sortSelect}
            size="large"
            style={{ width: 200 }}
            placeholder="Sort"
            optionFilterProp="children"
            onChange={onChangeType}
            defaultValue={{ value: "movie", label: "Movie" }}
          >
            <Option value="movie">Movie</Option>
            <Option value="tv">TV</Option>
          </Select>
        </div>


        {isloading ? <LoadMoreComponent/> : <div className={styles.containerResult}>

            {listkeyword.length > 0 &&
            <div className={styles.relatedKeywords}>
                <h2>keywords :  </h2>
                {listkeyword.map((item, index) => (
                    <Link key={index} className={styles.keywords} to={`/search?q=${item.name}`}>{item.name}</Link>
                    // <p key={index} className={styles.keywords}>{item.name}</p>
                ))}
            </div>
            }



            {type.current === "movie" && (
                <>
                {listresult.length > 0 ? 
                
                <InfiniteScroll
                className={styles.listResult}
                dataLength={listresult.length}
                next={nextData}
                loader={<LoadMoreComponent/>}
                hasMore={hasmore}
                endMessage={
                  <></>
                }
              >
                <div className={styles.totalresult}>
                <p>Total results : {resulttotal}</p>
                </div>
                  {listresult.map((item, index) => {

                   return item.poster_path !== null ? <ItemMovieVer key={index} itemmovie={item}/> : null
                      
                    })}
      
              </InfiniteScroll>
            : 
                <div className={styles.noResult}>No matching results were found</div>
            }</>
            )}

            {type.current === "tv" && (
                <>
                {listresult.length > 0 ? 
                <InfiniteScroll
                className={styles.listResult}
                dataLength={listresult.length}
                next={nextData}
                loader={<LoadMoreComponent/>}
                hasMore={hasmore}
                endMessage={
                  <></>
                }
              >
                <div className={styles.totalresult}>
                <p>Total results : {resulttotal}</p>
                </div>
                {listresult.map((item, index) => {
                    return item.backdrop_path !== null ? <ItemTvshow key={index} tv={item}/> : null
                })}
      
              </InfiniteScroll> 
            : <div className={styles.noResult}>No matching results were found</div>
            }</>
            )}

        </div>}

      </div>
    </div>
  );
}

export default Search;
