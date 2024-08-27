import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { randomUUID } from '~utils/uuid'
import type { Page, Site } from './type'

interface SiteState {
  sites: Site[]
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
    }
  }
})

export const { createSite, deleteSite, updateSite, createPage, updateSitePage } = siteSlice.actions

export default siteSlice.reducer