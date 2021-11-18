import React, { useState, useRef, useEffect } from 'react';
import { bannerSection } from 'src/utils';
import { useAppContext } from 'src/context/state';

import Slider from 'src/components/Slider';
import styles from 'styles/brand.module.scss';

const Brand = props => {
  const videoRef = useRef();
  const { pageFields = {} } = props;
  const { dispatch } = useAppContext();
  const [autoPlay, setAutoPlay] = useState(false);
  const [sliderli] = useState((pageFields.banner || []).map(bannerSection));
  
  const afterChange = i => {
    dispatch({ type: 'updateLogoProps', payload: { colorClass: pageFields.banner[i].colorClass || '-' } });
  };

  useEffect(() => {
    videoRef.current.addEventListener('ended', () =>  setAutoPlay(false), false);
  }, []);

  const { products_list, brand_list, growing, born, gather } = pageFields;

  const handlePlay = () => {
    if (autoPlay) {
      videoRef.current.pause();
      setAutoPlay(false);
      return false;
    }
    videoRef.current.play();
    setAutoPlay(true);
  };

  return (
    <div className="main">

      <section className={styles.bannerWrap}>
        <Slider {...props} sliderli={sliderli} afterChange={afterChange} />
      </section>

      <section className={`${styles.titleWrap} ${styles.title} content`}>
        <h1>{gather.title}</h1>
        <h1>{gather.subtitle}</h1>
      </section>

      <section className={styles.videoWrap}>
        <video 
          className={styles.videoStyle} 
          onClick={() => handlePlay()} 
          ref={videoRef} 
          src={gather.videoUrl}
          poster={gather.poster}
          autoPlay={autoPlay} 
          muted  
        />
        {
          !autoPlay && <div className={styles.videoMask}>
            <button type="button" onClick={() => handlePlay()} onKeyDown={() => handlePlay()}>
              <img src={gather.playBtn} alt="video" />
            </button>
          </div>
        }
      </section>

      <section className={`${styles.bannerWrap} ${styles.setImage} `}>
        <div className={styles.pcShow}>
          <img src={gather.product} alt="product" />
        </div>
        <div className={styles.mobShow}>
          <img src={gather.mobProduct} alt="product" />
        </div>
      </section>

      <section className={styles.grey}>
        <div className="content">

          <div className={styles.titleWrap}>
            <h1>{brand_list.title} </h1>
            <p>{brand_list.des}</p>
            <p>{brand_list.des1}</p>
          </div>

          <ul className={styles.brand}>
            {
              brand_list.list.map((item, index) => 
                <li key={index} className={`${index === 1 && `${styles.pcShow}`} ${index === 2 && `${styles.mobShow}`}`}>
                  { index !== 1 && <img src={item.img} alt="img" /> }
                  <div className={styles.brandContent}>
                    <h1>{item.title}</h1>
                    {
                      item.child && item.child.map((el, idx) => 
                        <p key={idx}>{el}</p>
                      )
                    }
                  </div>
                  { index === 1 && <img src={item.img} alt="img" /> }
                </li>
              )
            }
          </ul>

          <p className={styles.source}>{brand_list.source}</p>
        </div>
      </section>

      <section className={`content ${styles.chooseWrap}`}>
        <h1 className={styles.chooseH1}>{ products_list.title }</h1>
        <ul className={styles.choose}>
          {
            products_list && products_list.list.map((item, index) => 
              <li key={index}>
                <img src={item.img} alt={item.title} />
                <div>
                  <h1>{item.title}</h1>
                  <p>{item.des}</p>
                </div>
              </li>
            )
          }
        </ul>
      </section>

      <section className={styles.bornWrap}>
        <div className={`${styles.pcShow} ${styles.bornPCImageStyle}`}>
          <img src={born.pcImage} alt="pcImage" />
        </div>
        <div className={`${styles.mobShow} ${styles.bornPCImageStyle}`}>
          <img src={born.mobileImage} alt="mobileImage" />
        </div>
        <div className={styles.bornContent}>
          <h1>{born.title}</h1>
          <div className={styles.bornText}>
            {
              born && born.list.map((item, index) => 
                <p key={index}>{item}</p>
              )
            }
          </div>
        </div>
      </section>

      <section className="content">
        <h1 className={styles.growingTitle}>{growing.title}</h1>
        <div className={styles.growingWrap}>
          <ul className={styles.growing}>
            {
              growing && growing.list.map((item, index) => 
                <li key={index}>
                  <p>{item.year}</p>
                  <p>{item.title}</p>
                </li>
              )
            }
          </ul>
        </div>
      </section>

    </div>
  );
};

export default Brand;
