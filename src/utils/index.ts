import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Site } from '~store/site/type'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 处理引用失效的情况，返回等同效果的最小化的 site
export function purifySite(site: Site) {
  const listRuleSet = new Set(site.listRules.map(rule => rule.id))
  const detailRuleSet = new Set(site.detailRules.map(rule => rule.id))
  const previewRuleSet = new Set(site.previewRules.map(rule => rule.id))
  const tagRuleSet = new Set(site.tagRules.map(rule => rule.id))
  const searchRuleSet = new Set(site.searchRules.map(rule => rule.id))
  site.pages.forEach(page => {
    page.list.rule = listRuleSet.has(page.list.rule) ? page.list.rule : ''
    page.detail.rule = detailRuleSet.has(page.detail.rule) ? page.detail.rule : ''
    page.preview.rule = previewRuleSet.has(page.preview.rule) ? page.preview.rule : ''
    page.tag.rule = tagRuleSet.has(page.tag.rule) ? page.tag.rule : ''
    page.search.rule = searchRuleSet.has(page.search.rule) ? page.search.rule : ''
  })
  return site
}