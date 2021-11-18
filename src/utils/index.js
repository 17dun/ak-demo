import React from 'react';

export function shopifyPropsFormat(results) {
  const metafield = {};
  results.forEach(v => {
    switch (v.value_type) {
      case 'json_string':
        metafield[v.key] = JSON.parse(v.value);
        break;
      default:
        metafield[v.key] = v.value;
        break;
    }
  });
  return metafield;
}

export function bannerSection(v, i) {
  const hasTxt = v.button || v.title;
  return (
    <a className={`bannerSection ${v.color}`} key={`homeslick-${i}`} href={v.link}
      target="_blank" rel="noreferrer">
      <img className="main showPc" src={v.img} alt=""/>
      <img className="main showMobile" src={v.mobileImg} alt=""/>
      <div className="content">
        {v.subTitle && <p className="subTitle" dangerouslySetInnerHTML={{ __html: v.subTitle }} />}
        {hasTxt && <div className="bannerTxt">
          <div className="title" dangerouslySetInnerHTML={{ __html: v.title }} />
          {v.button && <div className="btnBox">
            <button className={`btn hollow ${v.color}`} type="button">{v.button}</button>
          </div>}
        </div>}
      </div>
    </a>
  );
}

const allColors = [
  { title: '黑色|黑|玛瑙黑', color: '#000' },
  { title: '白色|白|云朵白', color: '#fff' },
  { title: '红色|红', color: '#de192a' },
  { title: '蓝色|蓝|宝石蓝', color: '#2a5885' },
  { title: '绿色|绿|薄荷绿', color: '#dbf3ea' },
  { title: '粉色|粉|珊瑚粉|水晶粉', color: '#edc3c0' },
  { title: '银色|银|矿石白', color: '#dbdcdf' },
  { title: '灰色|灰|深灰|深灰色', color: '#575c66' },
  { title: '薰衣草灰', color: '#878eba' }
];

export const getColors = title => {
  const results = allColors.filter(v => v.title.split('|').some(color => color === title));
  return results.length ? results[0].color : 'none';
};

export const isMobile = () => (window.innerWidth < 768);
