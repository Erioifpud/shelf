import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import type { RootState } from '~store';

export function usePageAndSite() {
  const { pageId, siteId } = useParams()
  if (!pageId || !siteId) {
    return {
      site: null,
      page: null,
      siteId: '',
      pageId: '',
    }
  }
  const sites = useSelector((state: RootState) => state.site.sites)
  const site = sites.find(s => s.id === siteId)
  const page = site?.pages.find(p => p.id === pageId)
  return { site, page, siteId, pageId }
}

export function usePageList() {
  const { page, site } = usePageAndSite()
  if (!page || !site) {
    return null
  }
  const info = page.list
  const ruleId = info.rule
  const ruleInfo = site.listRules.find(r => r.id === ruleId)
  return {
    page,
    ...info,
    ruleInfo
  }
}