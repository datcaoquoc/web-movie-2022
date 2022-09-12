import { BsCaretDownFill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { IoLanguageOutline } from "react-icons/io5";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Headless from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { Affix } from "antd";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import styles from "./header.module.scss";
import logo from "../image/logo.png";

function HeaderComponent() {
  const [genres, setGenres] = useState([]);
  const [keysearch, setKeysearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", function () {
      var header = document.getElementsByClassName(styles.containerNav);
      header[0].classList.toggle(styles.sticky, window.scrollY > 90);
    });
  }, []);

  const onChangeKeySearch = (e) => {
    setKeysearch(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} />
        <marquee className={styles.marquee}>
          FPT Movie là ứng dụng xem truyền hình trực tuyến phổ biến trên các
          dòng điện thoại thông minh, máy tính bảng hoặc Android TV Box. Người
          xem được tận hưởng các chương trình truyền hình, phim ảnh, bóng đá,
          gameshow,... đến từ FPT Movie với trải nghiệm hình ảnh và âm thanh
          chân thực nhất.
        </marquee>
      </div>
      <Affix offsetTop={0}>
        <div className={styles.containerNav}>
          <div className={styles.navBar}>
            <div className={styles.categoryContainer}>
              <ul className={styles.listCategory}>
                <li>
                  <Link className={styles.categoryItem} to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Headless
                    hideOnClick={false}
                    trigger="mouseenter focus"
                    interactive
                    placement="bottom-end"
                    render={(attrs) => (
                      <div>
                        <ul className={styles.childrenCategory}>
                          {genres.map((item) => (
                            <li key={item.id}>
                              <Link
                                className={styles.categoryItemchil}
                                to={`/genre/${item.name}`}
                                state={{
                                  genreId: item.id,
                                  genreName: item.name,
                                }}
                              >
                                {" "}
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  >
                    <span className={styles.categoryItem}>
                      Movie <BsCaretDownFill />
                    </span>
                  </Headless>
                </li>

                <li>
                  <Link className={styles.categoryItem} to={"/tvshow"}>
                    TV Show
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.toolContainer}>
              <Tippy content="Search">
                <Headless
                  hideOnClick={true}
                  trigger="click"
                  interactive
                  placement="bottom-end"
                  render={(attrs) => (
                    <div
                      className={styles.tippytooltip}
                      tabIndex="1"
                      {...attrs}
                    >
                      <input
                        value={keysearch}
                        onChange={onChangeKeySearch}
                        placeholder="Khám phá bộ phim mà bạn yêu thích ..."
                      ></input>
                      <Link
                        onClick={() => setKeysearch("")}
                        to={
                          keysearch === ""
                            ? `/`
                            : `/search?q=${keysearch.replace(/\s/g, "-")}`
                        }
                        className={styles.btnsearch}
                      >
                        Search
                      </Link>
                    </div>
                  )}
                >
                  <div className={styles.icon}>
                    <IoSearchOutline className={styles.icSearch} />
                  </div>
                </Headless>
              </Tippy>
              <button className={styles.btnBy}>Đăng Nhập</button>
            </div>
          </div>
        </div>
      </Affix>
    </div>
  );
}

export default HeaderComponent;
