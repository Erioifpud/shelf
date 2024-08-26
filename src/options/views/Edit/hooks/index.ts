import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import type { RootState } from '~store';

// 当前编辑的站点对象
export const useCurrentSite = () => {
  const match = useMatch('/edit/:id/*');
  const sites = useSelector((state: RootState) => state.site.sites)

  if (!match) {
    return null;
  }
  return sites.find(site => site.id === match.params.id)
}

// 当前编辑的站点 id
export const useCurrentSiteId = () => {
  const site = useCurrentSite()
  return site?.id || ''
}

// 当前编辑路由的类型
export const useCurrentEditPage = () => {
  const match = useMatch('/edit/:id/:type/*');
  return match?.params.type || ''
}

// 当前编辑的站点 page 对象列表
export const usePages = () => {
  const site = useCurrentSite()
  if (!site) {
    return null;
  }
  return site.pages
}

// 当前编辑的站点 page 对象
export const useCurrentPage = () => {
  const match = useMatch('/edit/*/*/page/:pageId/*');
  const pages = usePages()

  if (!match || !pages) {
    return null;
  }
  return pages.find(page => page.id === match.params.pageId)
}

// 当前编辑的站点 page id
export const useCurrentPageId = () => {
  const page = useCurrentPage()
  return page?.id || ''
}
