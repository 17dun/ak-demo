// /components/Header.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppContext } from 'src/context/state';

const Header = props => {
  const { shopFields = {}, collectionListing = [], homeFields = {} } = props;
  const { state, dispatch } = useAppContext();
  const [navHidden, navChange] = useState(true);
  // const [navMouseChange,setNavMouseChange] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const { logoProps } = state;
    if (!logoProps.colorClass && homeFields.banner && homeFields.banner.length) {
      dispatch({ type: 'updateLogoProps', payload: { colorClass: homeFields.banner[0].colorClass || '-' } });
    } else if (logoProps.colorClass && (!homeFields.banner || !homeFields.banner.length)) {
      dispatch({ type: 'updateLogoProps', payload: { colorClass: '' } });
    }
  });
  
  if (!shopFields.header) return '';
  const { logoProps } = state;
  const { nav: { main } } = shopFields.header;
  return (
    <section className={`header-container ${router.route === '/' && 'fixedHeader'}`}>
      <div className="content">
        {shopFields.header && (
          <div className="flex">
            <div className="menu showMobile">
              <button type="button" className="btn" onClick={() => navChange(false)}>
                <i className="iconfont iconmenu" />
              </button> 
            </div>

            <div className="logo">
              <Link href="/" passHref>
                <a href="passHref">
                  <i className={`iconfont iconanker-cn ${logoProps.colorClass}`} />
                </a>
              </Link>
            </div>
            <ul className={`nav flex ${navHidden && 'navHidden'}`}>
              {
                main.map((v, i) => {
                  const current = collectionListing.filter(collection => (collection.title === v.txt || collection.handle === v.txt));
                  const handle = current && current.length ? current[0].handle : collectionListing[0].handle;
                  return (<li key={v.txt}>
                    <Link href={v.link ? v.link : `/collection/${handle}`} passHref>
                      <a aria-label={`nav-${i}`} 
                        href="/passHref" 
                        dangerouslySetInnerHTML={{ __html: v.txt }}
                        onClick={() => navChange(true)}
                        // onMouseOver={()=>setNavMouseChange(v.txt)}
                        // onMouseOut={()=>setNavMouseChange(false)}
                      />
                    </Link>
                  </li>);
                })
              }
              <li className="close showMobile">
                <button type="button" className="bm-cross-button btn" onClick={() => navChange(true)}>
                  <span className="bm-cross" />
                  <span className="bm-cross-re" />
                </button>
              </li>
            </ul>
          </div>)
        }
      </div>
      <div className={`mask ${navHidden && 'hidden'}`} />
    </section>  
  );
};

export default Header;
