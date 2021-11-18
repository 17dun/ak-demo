
import React from 'react';
import Layout from 'src/components/Layout';
import { AppWrapper } from 'src/context/state';
// import isMobile from 'ismobilejs';
// import { shopifyPropsFormat } from 'src/utils';
// import { shopify } from 'server/shopify-api-node';

import 'styles/normalize.scss';
import 'styles/global.scss';

const WrappedApp = ({ Component, pageProps }) => (
  <AppWrapper>
    <Layout pageProps={pageProps}>
      <Component {...pageProps} />
    </Layout>
  </AppWrapper>
);

// WrappedApp.getInitialProps = async ({ req }) => {
// const shopfield = await shopify.metafield.list({ metafield: { owner_resource: 'shop' } });
// const collectionListing = await shopify.collectionListing.list();
// const userAgent = req ? req.headers['user-agent'] : {};
// const onMobile = isMobile(userAgent);
// return {
// onMobile,
// collectionListing,
// shopFields: shopifyPropsFormat(shopfield),
//   };
// };

export default WrappedApp;
