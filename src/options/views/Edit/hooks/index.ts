import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import type { RootState } from '~store';
import type { RuleProps } from '~store/site/type';

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
  const match = useMatch('/edit/:id/page/:pageId/*');
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

const ruleTypeMapper: Record<string, RuleProps> = {
  list: 'listRules',
  detail: 'detailRules',
  preview: 'previewRules',
  search: 'searchRules',
  tag: 'tagRules'
}

// 当前编辑的站点 rule 对象
export const useCurrentRule = () => {
  const match = useMatch('/edit/:id/:ruleType/:ruleId/*');
  const site = useCurrentSite()

  if (!match || !site) {
    return null;
  }
  const list = site[ruleTypeMapper[match.params.ruleType]]
  if (!list) {
    return null
  }
  return list.find(rule => rule.id === match.params.ruleId)
}

// 当前编辑的站点 rule id
export const useCurrentRuleId = () => {
  const rule = useCurrentRule()
  return rule?.id || ''
}
