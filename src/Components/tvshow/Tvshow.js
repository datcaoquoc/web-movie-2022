import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Select, Carousel } from "antd";
import { AiFillCaretDown } from "react-icons/ai";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState,useRef } from "react";
import axios from 'axios';

import styles from "./tvshow.module.scss";
import ItemTvshow from "../../common/itemTvshow/ItemTvshow";
import LoadMoreComponent from "../../common/loadmore/LoadMoreCompoent";


const { Option } = Select;

let hasmore = true;

function Tvshow() {

    const [listtv, setListtv] = useState([]);
    const [listgenre, setListGenre] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const page = useRef(1);
    const genres = useRef({genre: ''});

    useEffect(()=>{
        window.scrollTo(0, 0)
        page.current = 1;
        genres.current.genre = "";
        hasmore = true;

        var promiseGenres = new Promise(function (resolve, reject) {
            axios
              .get(
                `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
              )
              .then((res) => {
                resolve(res.data.genres);
              })
              .catch((err) => {
                reject(err);
              });
          });

        promiseGenres.then(result => {
            setListGenre(result)
        })

        getListTV();
    },[])

    const getListTV = () => {
        var promisetv = new Promise(function (resolve, reject) {
            axios
              .get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=${genres.current.genre}&page=${page.current}&sort_by=popularity.desc`
              )
              .then((res) => {
                resolve(res.data.results);
              })
              .catch((err) => {
                reject(err);
              });
          });
        
      
          promisetv.then(result => {
            result.length < 20 && (hasmore = false)
            result.length >= 20 && (hasmore = true)
            if(Number(page.current) === 1) {
                setListtv(result)
                console.log(result)
            }else{
                setListtv([...listtv,...result])
            }
            setIsloading(false)
          })
    }

    const onChangeGenre = (value) => {
        genres.current.genre = value
        page.current = 1;
        setIsloading(true)
        window.scrollTo(0, 0)
        getListTV();
    };

    const nextData = () => {
        page.current += 1;
        getListTV();
    }


  return (
    <div className={styles.container}>
      <div className={styles.bodyContainer}>
        <Breadcrumb className={styles.breadcrumbItem}>
          <Breadcrumb.Item >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item >
            Tv show
          </Breadcrumb.Item>
        </Breadcrumb>
        <Carousel autoplay dots={false}>
        <img className={styles.banner} src="https://fpt247.com.vn/wp-content/uploads/sites/527/2022/05/hopnhatthuonghieu.jpg"></img>
        <img className={styles.banner} src="https://truyenhinhkplusvn.com/wp-content/uploads/2019/10/Truy%E1%BB%81n-h%C3%ACnh-K-%C4%90%E1%BB%99i-tuy%E1%BB%83n-t%C3%B4i-y%C3%AAu.jpg"></img>
        <img className={styles.banner} src="https://fptbox.store/wp-content/uploads/2021/09/danh-sach-kenh-truyen-hinh-fpt-play-scaled.jpg"></img>
        </Carousel>

      <div className={styles.bodyContainer1}>
      <Select
                suffixIcon={<AiFillCaretDown className={styles.suffixIcon}/>}
                className={styles.sortSelect}
                size="large"
                style={{ width: 200 }}
                placeholder="Sort"
                optionFilterProp="children"
                onChange={onChangeGenre}
                defaultValue={{ value: "", label: "All" }}
            >
              <Option value="">All</Option>
                {listgenre && listgenre.map((item, index) => (
                        <Option key={index} value={item.id}>{item.name}</Option>
                ))}
            </Select>

        
    </div>

        {isloading ? <LoadMoreComponent/> : 
        <InfiniteScroll
          className={styles.listTv}
          dataLength={listtv.length}
          next={nextData}
          loader={<LoadMoreComponent/>}
          hasMore={hasmore}
          endMessage={
            <></>
          }
        >
            {listtv.map((item, index) => (
                <>{item.backdrop_path !== null ? <ItemTvshow key={index} tv={item}/> : null}</>
            ))}
        </InfiniteScroll>
        }

        </div>
    </div>
  );
}

export default Tvshow;
