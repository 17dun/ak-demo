import { shopify, getGlobalProps } from 'server/shopify-api-node';
import { shopifyPropsFormat } from 'src/utils';
import Home from 'src/components/Home/Main';

export default Home;

export const getStaticProps = async () => {
  // const results = await fetcher({ url: '/api/shopify/product/list' });
  // public
  const globalProps = await getGlobalProps();

  // private
  const pages = await shopify.page.list();
  const current = pages.filter(v => v.title === 'Home').pop();
  const homeFields = await shopify.metafield.list({ metafield: { owner_resource: 'page', owner_id: current.id } });
  return { 
    props: {
      ...globalProps,
      homeFields: shopifyPropsFormat(homeFields),
      meta: {
        title: '首页'
      }
    },
    revalidate: 60
  };
};
