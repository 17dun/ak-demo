import React, { useState } from 'react';
import { bannerSection } from 'src/utils';
import { useAppContext } from 'src/context/state';
import ReactPlayer from 'react-player';
import Slider from 'src/components/Slider';
import styles from 'styles/Activities.module.scss';

const Main = props => {
  const { metafield = {} } = props;
  const { dispatch } = useAppContext();
  const afterChange = (g, mod) => {
    dispatch({ type: 'updateLogoProps', payload: { colorClass: metafield[mod][g].colorClass || '-' } });
  };

  // 模板排序
  const [videoPlaying, playfn] = useState(0);
  const [modules] = useState(
    Object.keys(metafield).sort((a, b) => {
      const num_a = a.split('_').pop();
      const num_b = b.split('_').pop();
      return num_a && num_b && num_a - num_b;
    })
  );

  const playVideo = v => {
    playfn(v);
  };

  const PauseVideo = () => {
    if (videoPlaying)  playfn(false);
   
  };

  // 模板 render函数
  const bannerRender = (mod, index) => {
    const sliderli = metafield[mod].map(bannerSection);
    return (
      <section key={`banner${index}`} className={styles.banner}>
        <Slider {...props} sliderli={sliderli} afterChange={g => afterChange(g, mod)} />
      </section>
    );
  };

  const videoRender = (mod, index) => {
    const video = metafield[mod];
    return (
      <section key={`video${index}`} className={`${styles.video} content`}>
        <ReactPlayer
          width="100%"
          height="100%"
          playing={!!videoPlaying}
          onEnded={() => playVideo(0)}
          url={video.url} 
        />
        {!videoPlaying && (
          <div className={styles.back}>
            {video.light && videoPlaying === 0 && <img src={video.light} alt="" />}
          </div>)
        }
        {video.play
          ? <div className={styles.action} role="button" tabIndex={0} 
            onClick={() => PauseVideo()}
            onKeyDown={() => PauseVideo()}
          >
            {!videoPlaying 
              ? <a type="button" role="button" tabIndex={0} 
                onClick={() => playVideo(true)}
                onKeyDown={() => playVideo(true)}
              >
                <img 
                  className={styles.play} 
                  src={video.play} 
                  alt=""
                />
              </a>
              : ''
            }
          </div>
          : ''
        }
      </section>
    );
  };

  const posterRender = (mod, index) => {
    const poster = metafield[mod];
    return (
      <section key={`poster${index}`} className={`${styles.poster} content`}>
        { bannerSection(poster, 'poster') }
        { poster.corner 
          ? <div className="corner">
            <img src={poster.corner} alt="" />
          </div>
          : ''
        }
      </section>
    );
  };

  const mutiPosterRender = (mod, index) => {
    const muti_poster = metafield[mod];
    return (
      <section key={`muti_poster${index}`} className={`${styles.muti_poster} flex content`}>
        {
          muti_poster && muti_poster.map((v, i) => (
            <div key={`muti_poster-${i}`} className={styles.flexBox}>
              <a className={styles.muti_poster_a} href={v.link} target="_blank"
                rel="noreferrer">
                <img src={v.img} alt=""/>
              </a>
              <div className={styles.text}>
                <h1 dangerouslySetInnerHTML={{ __html: v.title }} />
                <p dangerouslySetInnerHTML={{ __html: v.subtitle }} />
                <div className="btn-hollow">
                  <a href={v.link} target="_blank" rel="noreferrer">
                    { v.button }
                  </a>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    );
  };

  const qrCodeRender = (mod, index) => {
    const QRcode = metafield[mod];
    return (
      <section key={`QRcode${index}`} className={styles.QRcode}>
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
    );
  };

  // key-value 模板地图
  const renderMap = new Map([
    [/^banner\w*$/, bannerRender],
    [/^video\w*$/, videoRender],
    [/^poster\w*$/, posterRender],
    [/^muti_poster\w*$/, mutiPosterRender],
    [/^qrCode\w*$/, qrCodeRender],
  ]);

  return (
    <div className="main">
      {
        modules && modules.map((v, i) => (
          [...renderMap].filter(([key]) => key.test(v)).map(([,value]) => value(v, i))
        ))
      }
    </div>
  );
};

export default Main;
