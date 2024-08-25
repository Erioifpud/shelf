import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import type { RootState } from '~store';

export const useCurrentSite = () => {
  const match = useMatch('/edit/:id');
  const sites = useSelector((state: RootState) => state.site.sites)

  if (!match) {
    return null;
  }
  return sites.find(site => site.id === match.params.id)
}

export const useCurrentSiteId = () => {
  const match = useMatch('/edit/:id');
  return match?.params.id || ''
}