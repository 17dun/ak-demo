import { shopify, getGlobalProps } from 'server/shopify-api-node';
import List from 'src/components/collection/List';

export default List;

export const getStaticPaths = async () => {
  const collectionListing = await shopify.collectionListing.list();
  return {
    paths: collectionListing.map(v => ({ params: { handle: String(v.handle) } })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const { handle } = params;
  // public
  const globalProps = await getGlobalProps();
  const { collectionListing, shopFields } = globalProps;
  debugger;
  // private
  const collection_current = collectionListing.filter(v => v.handle === handle);
  if (collection_current.length <= 0) return { notFound: true };
  if (collection_current.length <=0 ) return { props: { collection: {}, collectionListing, shopFields }, revalidate: 60 };
  const collection_id = collection_current.length ? collection_current[0].collection_id : '';
  const collection = await shopify.collection.get(collection_id);
  const productsList = await shopify.product.list({ collection_id });
  const customize_link = shopFields && shopFields.tmall_link ? Object.keys(shopFields.tmall_link) : [];
  const products = productsList.map(v => {
    const variants = v.variants.map(variant => {
      const link = customize_link.filter(sku => (variant.sku === sku));
      const tmall_link = link.length ? shopFields.tmall_link[link[0]] : '';
      return {
        ...variant,
        tmall_link
      };
    });

    return {
      ...v,
      variants
    };
  });

  const sortsRuler = await shopify.collection.products(collection_id);
  // const sorts = await shopify.productListing.list({ collection_id });
  products.sort((a, b) => {
    let aIndex; let bIndex;
    sortsRuler.forEach((v, i) => {
      if (v.id === a.id) aIndex = i;
      if (v.id === b.id) bIndex = i;
    });
    return aIndex - bIndex;
  });

  return { 
    props: { 
      ...globalProps,
      collection: {
        ...collection,
        products
      },
      meta: {
        title: collection.title
      }
    },
    revalidate: 120
  };
};
