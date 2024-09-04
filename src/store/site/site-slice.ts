import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { randomUUID } from '~utils/uuid'
import type { Page, SelectAction, Site, ListRule, PreviewRule, DetailRule, SearchRule, TagRule, RuleProps, RuleTypeMapper } from './type'

interface SiteState {
  sites: Site[]
}

function createAction(): SelectAction {
  return {
    selector: '',
    function: '',
    param: '',
    regex: '',
    replace: '',
  }
}

export function createListRule(): ListRule {
  return {
    id: randomUUID(),
    name: 'New list rule',
    item: createAction(),
    title: createAction(),
    cover: createAction(),
    idCode: createAction(),
    largeImage: createAction(),
    video: createAction(),
    category: createAction(),
    author: createAction(),
    rating: createAction(),
    likes: createAction(),
    publishDate: createAction(),
    updateDate: createAction(),
    views: createAction(),
    uploader: createAction(),
    duration: createAction(),
    coverWidth: createAction(),
    coverHeight: createAction(),
    totalPictures: createAction(),
    secondPageUrl: createAction(),
    headerRule: {
      httpHeaders: '',
      pictureHeaders: '',
    },
    pagerRule: {
      nextPage: createAction()
    },
  }
}

export function createDetailRule(): DetailRule {
  return {
    id: randomUUID(),
    name: 'New detail rule',
    title: createAction(),
    description: createAction(),
    cover: createAction(),
    coverWidth: createAction(),
    coverHeight: createAction(),
    largeImage: createAction(),
    video: createAction(),
    category: createAction(),
    author: createAction(),
    uploader: createAction(),
    publishDate: createAction(),
    updateDate: createAction(),
    rating: createAction(),
    duration: createAction(),
    likes: createAction(),
    views: createAction(),
    totalPictures: createAction(),
    secondPageUrl: createAction(),
    tagRule: {
      item: createAction(),
      name: createAction(),
      url: createAction(),
    },
    pictureRule: {
      item: createAction(),
      thumbnail: createAction(),
      url: createAction(),
      link: createAction(),
    },
    videoRule: {
      item: createAction(),
      thumbnail: createAction(),
      url: createAction(),
      link: createAction(),
    },
    chapterRule: {
      item: createAction(),
      idCode: createAction(),
      title: createAction(),
      date: createAction(),
      url: createAction(),
    },
    commentRule: {
      item: createAction(),
      avatar: createAction(),
      username: createAction(),
      date: createAction(),
      content: createAction(),
    },
    pagerRule: {
      nextPage: createAction()
    },
    headerRule: {
      httpHeaders: '',
      pictureHeaders: '',
      videoHeaders: '',
    },
  }
}

export function createPreviewRule(): PreviewRule {
  return {
    id: randomUUID(),
    name: 'New preview rule',
    secondPageUrl: createAction(),
    pictureRule: {
      item: createAction(),
      picture: createAction(),
      totalPictures: createAction(),
      totalPages: createAction(),
      secondPageUrl: createAction(),
    },
    videoRule: {
      item: createAction(),
      title: createAction(),
      cover: createAction(),
      url: createAction(),
    },
    headerRule: {
      httpHeaders: '',
      pictureHeaders: '',
      videoHeaders: '',
    }
  }
}

export function createSearchRule(): SearchRule {
  return {
    id: randomUUID(),
    name: 'New search rule',
    item: createAction(),
    idCode: createAction(),
    title: createAction(),
    cover: createAction(),
    coverWidth: createAction(),
    coverHeight: createAction(),
    largeImage: createAction(),
    video: createAction(),
    category: createAction(),
    author: createAction(),
    uploader: createAction(),
    publishDate: createAction(),
    updateDate: createAction(),
    rating: createAction(),
    duration: createAction(),
    likes: createAction(),
    views: createAction(),
    totalPictures: createAction(),
    secondPageUrl: createAction(),
    pagerRule: {
      nextPage: createAction()
    },
    headerRule: {
      httpHeaders: '',
      pictureHeaders: '',
    }
  }
}

export function createTagRule(): TagRule {
  return {
    id: randomUUID(),
    name: 'New tag rule',
    item: createAction(),
    idCode: createAction(),
    title: createAction(),
    cover: createAction(),
    coverWidth: createAction(),
    coverHeight: createAction(),
    largeImage: createAction(),
    video: createAction(),
    category: createAction(),
    author: createAction(),
    uploader: createAction(),
    publishDate: createAction(),
    updateDate: createAction(),
    rating: createAction(),
    duration: createAction(),
    likes: createAction(),
    views: createAction(),
    totalPictures: createAction(),
    secondPageUrl: createAction(),
    pagerRule: {
      nextPage: createAction()
    },
    headerRule: {
      httpHeaders: '',
      pictureHeaders: '',
    }
  }
}

function createEmptySite(): Site {
  return {
    id: randomUUID(),
    common: {
      siteName: 'New site',
      siteIcon: '',
      author: 'unknown',
      version: '0.0.1',
      description: '',
      loginUrl: '',
      cookie: '',
      token: '',
      flags: ''
    },
    pages: [],
    listRules: [],
    detailRules: [],
    previewRules: [],
    searchRules: [],
    tagRules: [],
  }
}

function createEmptyPage(): Page {
  return {
    id: randomUUID(),
    title: 'New page',
    flags: '',
    query: [],
    searchParams: {
      key: '',
      value: '',
      type: 'query',
    },
    searchSuggestion: false,
    list: {
      url: '',
      rule: '',
      displayMode: 'card',
      headers: '',
    },
    detail: {
      url: '',
      rule: '',
      headers: '',
    },
    preview: {
      url: '',
      rule: '',
      headers: '',
    },
    tag: {
      url: '',
      rule: '',
      displayMode: 'card',
      headers: '',
    },
    search: {
      url: '',
      rule: '',
      displayMode: 'card',
      headers: '',
    },
    subPages: []
  }
}

const initialState: SiteState = {
  sites: []
}

const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: {
    createSite: (state) => {
      state.sites.push(createEmptySite())
    },
    deleteSite: (state, action: PayloadAction<string>) => {
      state.sites = state.sites.filter(site => site.id !== action.payload)
    },
    updateSite: (state, action: PayloadAction<Partial<Site>>) => {
      const site = state.sites.find(site => site.id === action.payload.id)
      if (site) {
        Object.assign(site, action.payload)
      }
    },
    createPage: (state, action: PayloadAction<string>) => {
      const site = state.sites.find(site => site.id === action.payload)
      if (site) {
        site.pages.push(
          createEmptyPage()
        )
      }
    },
    updateSitePage: (state, action: PayloadAction<{ siteId: string, page: Partial<Page> }>) => {
      const site = state.sites.find(site => site.id === action.payload.siteId)
      if (!site) {
        return
      }
      const page = site.pages.find(page => page.id === action.payload.page.id)
      if (!page) {
        return
      }
      Object.assign(page, action.payload.page)
    },
    createSiteRule: (state, action: PayloadAction<{ siteId: string, ruleName: RuleProps }>) => {
      const site = state.sites.find(site => site.id === action.payload.siteId)
      let createFn
      if (!site) {
        return
      }
      switch (action.payload.ruleName) {
        case 'detailRules':
          createFn = createDetailRule
          break
        case 'listRules':
          createFn = createListRule
          break
        case 'previewRules':
          createFn = createPreviewRule
          break
        case 'searchRules':
          createFn = createSearchRule
          break
        case 'tagRules':
          createFn = createTagRule
          break
        default:
          return
      }
      const property = action.payload.ruleName
      site[property] = [
        ...site[property],
        createFn(),
      ]
      // Object.assign(site, { [property]: [...site[property], createFn()] })
    },
    updateSiteRule: (state, action: PayloadAction<{ siteId: string, ruleName: RuleProps, rule: Partial<RuleTypeMapper[RuleProps]> }>) => {
      const site = state.sites.find(site => site.id === action.payload.siteId)
      if (!site) {
        return
      }
      site[action.payload.ruleName].forEach(rule => {
        if (rule.id === action.payload.rule.id) {
          Object.assign(rule, action.payload.rule)
        }
      })
    }
  }
})

export const { createSite, deleteSite, updateSite, createPage, updateSitePage, createSiteRule, updateSiteRule } = siteSlice.actions

export default siteSlice.reducer