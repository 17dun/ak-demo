
import { shopify, getGlobalProps } from 'server/shopify-api-node';
import { shopifyPropsFormat } from 'src/utils';
import Main from 'src/components/activities/Main';

export default Main;

export const getStaticProps = async ({ params }) => {
  // public
  const globalProps = await getGlobalProps();

  // private
  const pageList = await shopify.page.list();
  const { handle } = params;
  const current = pageList.filter(v => v.handle === handle).pop();
  if (!current) return { notFound: true };
  const metaField = await shopify.metafield.list({ metafield: { owner_resource: 'page', owner_id: current.id } });
  const metafield = shopifyPropsFormat(metaField);
  if (metafield.page_type !== 'activities') return { notFound: true };

  return { 
    props: {
      ...globalProps,
      metafield,
      handle,
    },
    revalidate: 300
  };
};

export const getStaticPaths = async () => {
  const pageList = await shopify.page.list();
  return {
    paths: pageList.map(v => ({ params: { handle: String(v.handle) } })),
    fallback: true,
  };
};
