
import React from 'react';
import Link from 'next/link';
import { shopifyPropsFormat } from 'src/utils';
import { shopify } from 'server/shopify-api-node';

import styles from 'styles/Error.module.scss';

const page404 = () => (
  <section className={styles.err_page}>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <Link href="/" passHref>
      <a href="passHref" className={styles.link}>
        回到首页
      </a>
    </Link>
  </section>
);

export default page404;

export const getStaticProps = async () => {
  // public
  const shopfield = await shopify.metafield.list({ metafield: { owner_resource: 'shop' } });
  const collectionListing = await shopify.collectionListing.list();
  return { 
    props: {
      collectionListing,
      shopFields: shopifyPropsFormat(shopfield),
    },
    revalidate: 60
  };
};
