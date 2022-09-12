import styles from "./footercomponent.module.scss";

function FooterComponent() {
  return (
    <div className={styles.container}>
      <div className={styles.divContainer}>
        <h2>CẢM ƠN BẠN ĐÃ GHÉ THĂM , THANK YOU VERY MUCH !! </h2>
        <p>Sản phẩm web phim clone được phát triển bởi : Cao Quốc Đạt</p>
        <p>
          FaceBook:
          <a
            target="_blank"
            href="https://www.facebook.com/caoquocdat12092001/"
          >
            {" "}
            https://www.facebook.com/caoquocdat12092001/
          </a>
        </p>
        <p>Gmail: quocdatcao1@gmail.com</p>
        <p>Phone: 0354492575</p>
      </div>
    </div>
  );
}

export default FooterComponent;
