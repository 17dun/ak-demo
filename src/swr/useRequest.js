import useSWR from 'swr';
import { config } from 'config';

export const fetcher = ({ url, params = {} }) => fetch(`${config.basePath}${url}`, params).then(res => res.json());

export const useRequest = (url, params) => {
  if (!url) {
    throw new Error('url is required');
  }

  const res = useSWR(url, fetcher({ url, params }));

  return res;
};
