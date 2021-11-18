// /components/Header.js
import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppContext } from 'src/context/state';
import { CSSTransition } from 'react-transition-group'
import Animation from './Animation';
import useSWR from 'swr';

//公共格式化逻辑，可以提取
const formatData = async (res) => {
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data.results;
}
//公共获取数据逻辑可以提取，后面注意下对于不同method的特殊处理
const getData = async ({url,option}) => {
  let data = await fetch(url,option);
  return await formatData(data);
}

const Header = props => {
  const { shopFields = {}, collectionListing = [], homeFields = {}, collection={},shopify } = props;
  const { state, dispatch } = useAppContext();
  const [navHidden, navChange] = useState(true);
  const [isShowProduct,setIsShowProduct] = useState(false);
  let headerClassName = 'header-container';
  const oDiv = useRef();
  useEffect(() => {
    //此处需节流
      let divTop = oDiv.current.offsetTop;
      window.onscroll = function () {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          oDiv.current.className = scrollTop > divTop ? `${headerClassName} isfixed` : headerClassName;
          // oDiv.current.style.backgroundColor = scrollTop > divTop ? '#fff':'';
          // oDiv.current.style.position=scrollTop > divTop ? 'fixed':'';
      }
  }, []);

  const collectionItem = collectionListing.filter((item,index) => {
    return item.title===isShowProduct ? item : null;
  });
  
  const collection_id =  collectionItem[0]?.collection_id ;
 
  //这里是取数器fetcher，这里只接受一个url，是人家规范
  const getProductList = async (url) => {
    const res = await getData(url,{
       method:'POST',
       body: JSON.stringify({collection_id})
    })
    return formatData(res);
  }

  const { data, error } = useSWR(
    () => isShowProduct && `/api/shopify/product/list`,
    getProductList
  )

  console.log(data,error);

  const router = useRouter();
  useEffect(() => {
    const { logoProps } = state;
    const banner = homeFields.banner;
    if (!logoProps.colorClass && banner && banner.length) {
      dispatch({ type: 'updateLogoProps', payload: { colorClass: banner[0].colorClass || '-' } });
    } else if (logoProps.colorClass && (!banner || !banner.length)) {
      dispatch({ type: 'updateLogoProps', payload: { colorClass: '' } });
    }
  });
  
  if (!shopFields.header) return '';
  const { logoProps } = state;
  const { nav: { main } } = shopFields.header;
  let navProducts = collection.products && collection.products.length>1 ? collection.products :[];
  
  const navTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 , height: '350px',visibility: 'visible'},
  }
  return (
    <>
    <div className={`${router.route !== '/' && 'collectionHeader'}`}/>
    <section ref={oDiv} className={`${headerClassName} ${router.route === '/' && 'fixedHeader'}`}>
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
                        onMouseEnter={()=>setIsShowProduct(v.txt)}
                        onMouseOut={()=>setIsShowProduct(false)}
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
    {navProducts.length > 1 && <Animation className="nav-products"  transitionStyles={navTransitionStyles} isShow={!!isShowProduct}>
      <ul className="products-content">
        {navProducts.map((item,index) => {
          if(index < 7 ){
          return (
            <li key={index}>
              <CSSTransition
                in={!!isShowProduct}
                timeout={500}
                classNames='product-item'
                key={index}
            >
                <div>
                  <div className="img"><img src={item.image.src} /></div>
                  <div>{item.title}</div>
                </div>
            </CSSTransition>
            </li>
          )
        }
        })}
        </ul>
    </Animation>}
    
    </> 
  );
};


export default Header;