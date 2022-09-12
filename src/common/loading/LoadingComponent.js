import { useEffect } from 'react';
import styles from './loadingcomponent.module.scss';

function LoadingComponent() {
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         left: 0,
    //         behavior: 'smooth'
    //       })
    // },[])
    return ( 
        <div className={styles.container}>
            <div className={styles.icload}><div></div><div></div><div></div></div>
        </div> 
    );
}

export default LoadingComponent;