import { useLocation } from 'react-router';

import { getPageContext } from '../lib/page-context';

export const usePageContext = () => {
    const { pathname, search } = useLocation();
    return getPageContext(pathname, search);
}