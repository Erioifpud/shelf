import { memo, useEffect, useMemo, useState } from 'react';
import { usePageList } from '../../hooks';
import { sendToBackground } from '@plasmohq/messaging';
import * as cheerio from 'cheerio/dist/browser';
import type { ListRule, SelectAction } from '~store/site/type';
import { parseAction } from '../../utils';

type Item = Record<keyof Omit<ListRule, 'id' | 'name' | 'headerRule'>, string | Record<string, string>>

const ListPage = memo(() => {
  const listInfo = usePageList()
  const [html, setHtml] = useState<string>('')
  const [itemHtmls, setItemHtmls] = useState<string[]>([])

  useEffect(() => {
    if (!listInfo) {
      return
    }
    sendToBackground({
      name: 'request',
      body: {
        url: listInfo.url,
        headers: listInfo.headers,
        isPost: listInfo.page.flags.split(',').includes('listPost')
      }
    }).then(({ message }) => {
      setHtml(message)
    })
  }, [])

  useEffect(() => {
    if (!html) {
      return
    }
  }, [html])

  const items = useMemo(() => {
    return itemHtmls.map(itemHtml => {
      const item: Item = {
        cover: '',
        coverWidth: '',
        coverHeight: '',
        title: '',
        category: '',
        author: '',
        uploader: '',
        duration: '',
        totalPictures: '',
        updateDate: '',
        publishDate: '',
        views: '',
        likes: '',
        rating: '',
        idCode: '',
        item: '',
        largeImage: '',
        pagerRule: {
          nextPage: ''
        },
        secondPageUrl: '',
        video: '',
      }
      for (const key in listInfo.ruleInfo) {
        let action: SelectAction
        if (['id', 'name', 'headerRule'].includes(key)) {
          continue
        }
        if (key === 'pagerRule') {
          action = listInfo.ruleInfo.pagerRule.nextPage
        } else {
          // @ts-ignore
          action = listInfo.ruleInfo[key as keyof ListRule]
        }

        const value = parseAction(action, itemHtml, html)
        item[key] = value
      }
      console.log('🚀 ~ items ~ item:', item)
      return item
    })
  }, [itemHtmls, html])

  return (
    <div>ListPage</div>
  )
})

export default ListPage
