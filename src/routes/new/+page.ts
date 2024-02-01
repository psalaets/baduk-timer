import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, url }) => {
  return {
    name: url.searchParams.get('name')
  };
};
