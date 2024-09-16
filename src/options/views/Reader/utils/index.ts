import { type CheerioAPI } from 'cheerio/dist/browser';
import * as cheerio from 'cheerio/dist/browser';
import type { SelectAction } from '~store/site/type';
import { get } from 'lodash-es'

function isActionEmpty(action: SelectAction): boolean {
  return !action.selector && !action.function && !action.param && !action.regex && !action.replace
}

function trimAction(action: SelectAction): SelectAction {
  return {
    ...action,
    selector: action.selector?.trim(),
    function: action.function?.trim(),
    param: action.param?.trim(),
    regex: action.regex?.trim(),
    replace: action.replace?.trim()
  }
}

interface PlaceholderItem {
  name: string
  params: string[]
}

export function parsePlaceholders(text: string): PlaceholderItem[] {
  const regex = /\{([a-zA-Z0-9]+):([^{}]+)?\}/g; // 添加全局标志 'g' 以匹配所有实例
  const matches: PlaceholderItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const templateName = match[1];
    const params = match[2] ? match[2].split(':').filter(Boolean) : []; // 过滤掉空字符串参数

    matches.push({
      name: templateName,
      params: params
    });
  }

  return matches
}

export function parseAction(_action: SelectAction, partText: string, fullText: string): string[] {
  const action = trimAction(_action)
  if (isActionEmpty(action)) {
    return ['']
  }
  if (action.selector.startsWith('$')) {
    return parseJsonAction(action, fullText)
  } else if (action.selector.startsWith('this')) {
    return parseHTMLAction({
      ...action,
      selector: action.selector.replace('this', ':root')
    }, cheerio.load(partText))
  } else {
    return parseHTMLAction(action, cheerio.load(fullText))
  }
}

function parseJsonAction(action: SelectAction, jsonStr: string): string[] {
  const selector = action.selector
  const json = JSON.parse(jsonStr)
  if (selector === '$') {
    return [jsonStr]
  }
  const fullPath = selector.replace('$.', '')
  const result = get(json, fullPath)
  if (Array.isArray(result)) {
    return result
  }
  return [result]
}

function parseHTMLActionEl(action: SelectAction, el: any): string {
  let result = ''
  console.log(el)
  // 处理 function 与 param
  if (action.function === 'text') {
    result = el.text()
  } else if (action.function === 'attr') {
    result = action.param ? el.attr(action.param) : ''
  } else if (action.function === 'html') {
    result = el.html() || ''
  }

  // 处理 regex
  let matches: string[] = []
  if (action.regex) {
    const regex = new RegExp(action.regex)
    matches = Array.from(regex.exec(result))
  }

  // 处理 replace
  if (action.replace) {
    const replacement = action.replace
    // 没有匹配，但用了 |{source:} 标记，就默认返回原有结果
    if (!matches.length && replacement.includes('|{source:}')) {
      return result
    }
    // |{source:} replace to original result
    result = replacement.replace('|{source:}', result)
    result = replacement.replace(/\$(\d+)/g, (_, index) => {
      return matches[parseInt(index)] || ''
    })
    // 这里应该不替换 placeholder，保持原样，等页面使用时才替换
    return result
  }

  if (!matches.length) {
    return result
  }

  // 如果正则有结果，那么返回 $1
  return matches[1] || ''
}

function parseHTMLAction(action: SelectAction, $: CheerioAPI): string[] {
  const el = $(action.selector)

  if (!el.length) {
    return ['']
  }
  if (el.length > 1) {
    return el.map((_, node) => {
      const text = parseHTMLActionEl(action, cheerio.load(node)())
      return text
    }).get()
  }

  return [parseHTMLActionEl(action, el)]
}