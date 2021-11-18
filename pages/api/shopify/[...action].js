
import { shopify } from 'server/shopify-api-node';

export async function getServerSideProps({ action = [], params = {} }) {
  const methods = action.join('-'); let results = {};
  switch (methods) {
    case 'product-list':
      results = await shopify.product.list(params);
      break;
    case 'metafield-list':
      results = await shopify.metafield.list(params);
      break;
    case 'productVariant-get':
      results = await shopify.productVariant.get(params.id);
      break;
    case 'productVariant-list':
      results = await shopify.productVariant.list(params.id);
      break;
    default:
      results = { error: 'resources 404' };
      break;
  }
  return {
    results
  }
};

export default async (req, res) => {
  const { query: { action }, body } = req;
  const params = JSON.parse(body);
  const results = await getServerSideProps({ action, params });
  if (results.status === '404') {
    res.status(404).json('Not resource');
  }
  res.status(200).json(results);
};
