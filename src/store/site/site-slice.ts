import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { randomUUID } from '~utils/uuid'
import type { Site } from './type'

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
  }
})

export const { createSite, deleteSite, updateSite } = siteSlice.actions

export default siteSlice.reducer