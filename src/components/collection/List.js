import React, { useState } from 'react';
import Link from 'next/link';
import { getColors } from 'src/utils';

import styles from 'styles/Collection.module.scss';

const List = props => {
  const { collection = {} } = props;
  const [cunrentVarient, selectColor] = useState(collection.products ? collection.products.map(() => 0) : []);
  
  const selector = (index, current) => {
    cunrentVarient[index] = current;
    const newData = [...cunrentVarient];
    selectColor(newData);
  };

  return (
    <div className={styles.collectionList}>
      {
        collection.title ? (
          <section className="content">
            <div className={`crumbs flex ${styles.crumbs}`}>
              <a href="/" target="_blank" rel="noreferrer">首页</a>
              <i className="iconfont iconarrow_right next" />
              <div className={styles.crumbsMenu}>
                {collection.title}
                <i className="iconfont iconarrow_down hidden" />
              </div>
            </div>
            <div className={styles.banner}>
              {collection.image && <img src={collection.image.src} alt={collection.image.alt} />}
            </div>
            <div className={styles.products}>
              <ul className={`${styles.productList} flex`}>
                {
                  collection.products && collection.products.map((v, index) => {
                    const variant = v.variants[cunrentVarient[index]];
                    const image = v.images[cunrentVarient[index]];
                    return (
                      <li className={styles.box} key={v.id}>
                        {
                          variant && variant.tmall_link ? (
                            <a href={variant.tmall_link} target="_blank" rel="noreferrer">
                              <div className={styles.img}>
                                {image && <img src={image.src} alt={image.alt} />}
                              </div>
                            </a>) : (
                            <div className={styles.img}>
                              {image && <img src={image.src} alt={image.alt} />}
                            </div>
                          )
                        }
                        <div className={styles.colors}>
                          {
                            v.variants.length > 1 ? v.variants.map((val, current) => (
                              <a key={val.inventory_item_id} role="button" alt={val.title}
                                tabIndex={0} onClick={() => selector(index, current)} onKeyDown={() => selector(index, current)}
                                className={styles.dot} style={{ background: getColors(val.title) }}
                              >{val.title}</a>
                            )) : ''
                          }
                        </div>
                        <div className={styles.name} dangerouslySetInnerHTML={{ __html: v.title }} />
                        <div className={styles.price}>{variant ? `￥${variant.price}` : ''}</div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </section>
        ) : (
          <section className={styles.err_page}>
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link href="/" passHref>
              <a href="passHref" className={styles.link}>
              回到首页
              </a>
            </Link>
          </section>
        )}
    </div>
  );
};

export default List;
