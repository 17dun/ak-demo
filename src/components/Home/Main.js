import React, { useState } from 'react';
import { bannerSection } from 'src/utils';
import { useAppContext } from 'src/context/state';
import Slider from 'src/components/Slider';
import styles from 'styles/Home.module.scss';

const Main = props => {
  const { homeFields = {} } = props;
  const { dispatch } = useAppContext();
  const [sliderli] = useState((homeFields.banner || []).map(bannerSection));
  const [modules] = useState(homeFields.modules);
  
  const afterChange = i => {
    dispatch({ type: 'updateLogoProps', payload: { colorClass: homeFields.banner[i].colorClass || '-' } });
  };

  const { poster, muti_poster, QRcode } = modules;
  return (
    <div className="main">
      <section className={styles.banner}>
        <Slider {...props} sliderli={sliderli} afterChange={afterChange} />
      </section>
      <section className={`${styles.poster} content`}>
        { bannerSection(poster, 'poster') }
      </section>
      <section className={`${styles.muti_poster} flex content`}>
        {
          muti_poster && muti_poster.map((v, i) => (
            <div key={`muti_poster-${i}`} className={styles.flexBox}>
              <a className={styles.muti_poster_a} href={v.link} target="_blank"
                rel="noreferrer">
                <img src={v.img} alt=""/>
              </a>
            </div>
          ))
        }
      </section>
      <section className={styles.QRcode}>
        <img className={`${styles.back} showMobile`} src={QRcode.mobileBack} alt=""/>
        <img className={`${styles.back} showPc`} src={QRcode.back} alt=""/>
        <div className="content">
          <div className="title" dangerouslySetInnerHTML={{ __html: QRcode.title }} />
          <div className="flex">
            {
              QRcode.qrCode && QRcode.qrCode.map((v, i) => (
                <div className="flexBox" key={`qrCode-${i}`}>
                  <img src={v.img} alt=""/>
                  <p dangerouslySetInnerHTML={{ __html: v.txt }} />
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
