import Shopify from 'shopify-api-node';
import { shopifyPropsFormat } from 'src/utils';

export const shopify = new Shopify({
  shopName: process.env.SHOPIFY_NAME,
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_PASSWORD,
  presentmentPrices: true
});

export const getGlobalProps = async () => {
  const shopfield = await shopify.metafield.list({ metafield: { owner_resource: 'shop' } });
  const collectionListing = await shopify.collectionListing.list();
  const productList = {};
  collectionListing.forEach (async item=>{
    const collection_id = item.collection_id
    productList[collection_id] = await shopify.product.list({collection_id});
  })
  return {
    collectionListing,
    shopFields: shopifyPropsFormat(shopfield),
    productList
  };
};
