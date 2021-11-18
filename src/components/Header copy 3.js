// /components/Header.js
import React, { useState, useEffect,useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppContext } from 'src/context/state';
import { CSSTransition } from 'react-transition-group'
import Animation from './Animation';
import useSWR from 'swr';

const Header = props => {
  const { shopFields = {}, collectionListing = [], homeFields = {}, collection={} } = props;
  const { state, dispatch } = useAppContext();
  const [navHidden, navChange] = useState(true);
  const [itemTitle,setItemTitle] = useState();
  const [isShowProduct,setIsShowProduct] = useState(false);
  const [products,setProducts] = useState({});
  let headerClassName = 'header-container';
  const oDiv = useRef();
  useEffect(() => {
    //此处需节流
      let divTop = oDiv.current.offsetTop;
      window.onscroll = function () {
          let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
          oDiv.current.className = scrollTop > divTop ? `${headerClassName} isfixed` : headerClassName;
      }
  }, []);

  const collectionItem = collectionListing.filter(item => {
    return item.title===itemTitle ? item : null;
  });

const collection_id =  collectionItem[0]?.collection_id ;
!collection_id && !products[collection.id] && (products[collection.id] = collection.products);

console.log(isShowProduct,itemTitle,collectionItem,products);
  const { data, error } = useSWR(
    () => isShowProduct && !products[collection_id] && `/api/shopify/product/list`,
    async (url) => {
      const res = await fetch(url,{
        method:'POST',
        body:JSON.stringify({
          collection_id
    　　})
    });
      const data = await res.json();
      if (res.status !== 200) {
        throw new Error(data.message)
      }
      products[collection_id] = data.results;
      return data.results;
    }
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
  let navProducts = products[collection_id] || []; //data || (collection.products && collection.products.length>1 ? collection.products :[]);
  
  const navTransitionStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 , height: '350px',visibility: 'visible'},
  }
  return (
    <>
    <div className={`${router.route !== '/' && 'collectionHeader'}`}/>
    <section ref={oDiv} className={`${headerClassName} ${router.route === '/' && 'fixedHeader'}`}
    onMouseOver={()=>{
      // setItemTitle(v.txt);
      setIsShowProduct(true)
    }}
    onMouseOut={()=>setIsShowProduct(false)}
    >
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
      {navProducts.length > 1 && 
      <Animation 
        className="nav-products" 
        transitionStyles={navTransitionStyles} 
        isShow={isShowProduct} 
        title={collectionItem.title} 
        >
        <ul className="products-content">
          {navProducts.map((item,index) => {
            if(index < 7 ){
            return (
              <li key={index}>
                <CSSTransition
                  in={isShowProduct}
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
      <div className={`mask ${navHidden && 'hidden'}`} />
    </section>
    </> 
  );
};


export default Header;