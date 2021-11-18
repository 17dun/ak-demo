import { shopify, getGlobalProps } from 'server/shopify-api-node';
import { shopifyPropsFormat } from 'src/utils';
import Brand from 'src/components/others/brand';

export default Brand;

export const getStaticProps = async () => {
  const globalProps = await getGlobalProps();

  // private
  const pages = await shopify.page.list();
  const current = pages.filter(v => v.title === 'brand').pop();
  const pageFields = await shopify.metafield.list({ metafield: { owner_resource: 'page', owner_id: current.id } });
  return { 
    props: {
      ...globalProps,
      pageFields: shopifyPropsFormat(pageFields),
      meta: {
        title: 'brand'
      }
    },
    revalidate: 300
  };
};
