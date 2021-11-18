// /components/Layout.js
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ pageProps, children }) => {
  const { meta, shopFields = {} } = pageProps;
  const { metaShop = {} } = shopFields;

  return (
    <>
      <Head>
        <meta key='charSet' charSet="utf-8" />
        <meta key='viewport' name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />
        <meta key='title' name="title" content={metaShop.title || 'Anker安克 - 中国官网'} />
        <meta key='description' name="description" content="Anker安克是安克创新旗下高端创新充电品牌，创立于2011年，在全球100多个多家和地区拥有超过6000万用户。连续3年位列Google、WPP和凯度联合发布的BrandZ™中国出海品牌榜TOP10。" />
        <meta name={metaShop.title || 'Anker安克 - 中国官网'} content="Anker安克是安克创新旗下高端创新充电品牌，创立于2011年，在全球100多个多家和地区拥有超过6000万用户。连续3年位列Google、WPP和凯度联合发布的BrandZ™中国出海品牌榜TOP10。" />
        <meta name="keywords" content="anker, 安克创新, 充电,安克" />
        { metaShop.siteLogo && <meta property="og:image" content={metaShop.siteLogo} /> }
        
        {meta && meta.title === '首页' && (<meta name="baidu-site-verification" content="code-HvrAivED8t" />)}
        <title>{metaShop.title || 'Anker安克 - 中国官网'}{meta ? ` | ${meta.title}` : ''}</title>

        <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2429024_qzolqpsh8zj.css" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-23867950-1" />
        <script
          dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-23867950-1');`
          }}
        />
      </Head>
    
      <Header {...pageProps} />
      <div className='content-container'>
        {children}
      </div>
      <Footer {...pageProps} />
    </>
  );
};

export default Layout;
