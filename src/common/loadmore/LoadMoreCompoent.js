import styles from "./loadmorecomponent.module.scss";

function LoadMoreComponent() {
    return ( 
        <div className={styles.container}>
            <div className={styles.ldsellipsis}><div></div><div></div><div></div><div></div></div>
        </div>
     );
}

export default LoadMoreComponent;