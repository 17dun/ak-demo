// /components/Header.js
import React from 'react';

const Footer = props => {
  const { shopFields } = props;
  if (!shopFields) return '';

  const { footer: { copyright, sub_brand } } = shopFields;
  return (
    <div className='footer-container'>
      <section className="footer-sub_brand">
        <div className="content">
          <div className="flex">
            {
              sub_brand && sub_brand.map((v, i) => (
                <a className="flexBox" key={`sub_brand-${i}`} href={v.link}
                  target="_blank" rel="noreferrer">
                  <i className={`iconfont ${v.icon}`} />
                </a>
              ))
            }
          </div>
        </div>
      </section>
      <section className='footer-container'>
        <div className="footer">
          <p className="copyright" dangerouslySetInnerHTML={{ __html: copyright }} />
        </div>
      </section>
    </div> 
  );
};

export default Footer;
