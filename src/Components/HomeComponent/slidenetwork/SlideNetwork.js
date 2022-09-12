import Slider from 'react-slick';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import styles from './slidenetwork.module.scss';
import { listNetwork } from '../../../common/fakedata/network.js'


function SlideNetwork() {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        variableWidth: true,
        arrows: true,
        autoplaySpeed: 3000,
        autoplay: false,
      };

    return ( 
        <div className={styles.container}>
            <Slider {...settings}>
                {listNetwork.map(item => (
                    <div key={item.id} className={styles.containerItem}>
                    <div className={styles.item}>
                        <LazyLoadImage
                        alt={item.name}
                        className={styles.logo}
                        src={item.origin_logo}
                        />
                    </div>
                </div>
                ))}
            </Slider>
        </div> 
    );
}

export default SlideNetwork;