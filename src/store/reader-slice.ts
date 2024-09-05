import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type Route = 'list' | 'detail' | 'preview' | 'search' | 'searching' | 'tag'
// 章节不另做页面，直接放入 detail

// 不用 react-router 的原因是涉及的 param 有点多，处理起来不方便
export interface ReaderState {
  // 使用状态管理路由
  route: Route
  // 使用的站点配置 id
  siteId: string
  // 当前页面 id
  pageId: string
  // 选中项目 id
  itemId: string
  // 选中的章节 id
  chapterId: string
  // 搜索关键字
  keyword: string
  // 选中的标签
  tag: string
}

const initialState: ReaderState = {
  route: 'list',
  siteId: '',
  pageId: '',
  itemId: '',
  chapterId: '',
  keyword: '',
  tag: ''
}

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    setRoute(state, action: PayloadAction<Route>) {
      state.route = action.payload
    },
    setSiteId(state, action: PayloadAction<string>) {
      state.siteId = action.payload
    },
    setPageId(state, action: PayloadAction<string>) {
      state.pageId = action.payload
    },
    setItemId(state, action: PayloadAction<string>) {
      state.itemId = action.payload
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload
    },
    setTag(state, action: PayloadAction<string>) {
      state.tag = action.payload
    },
    goToList(state, action: PayloadAction<{ siteId: string, pageId?: string }>) {
      state.route = 'list'
      state.siteId = action.payload.siteId
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
    },
    goToDetail(state, action: PayloadAction<{ siteId?: string, pageId?: string, itemId: string }>) {
      state.route = 'detail'
      if (action.payload.siteId) {
        state.siteId = action.payload.siteId
      }
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
      state.itemId = action.payload.itemId
    },
    goToPreview(state, action: PayloadAction<{ siteId?: string, pageId?: string, itemId?: string, chapterId: string }>) {
      state.route = 'preview'
      if (action.payload.siteId) {
        state.siteId = action.payload.siteId
      }
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
      if (action.payload.itemId) {
        state.itemId = action.payload.itemId
      }
      state.chapterId = action.payload.chapterId
    },
    goToSearching(state, action: PayloadAction<{ siteId?: string, pageId?: string }>) {
      state.route = 'searching'
      if (action.payload.siteId) {
        state.siteId = action.payload.siteId
      }
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
    },
    goToSearch(state, action: PayloadAction<{ siteId?: string, pageId?: string, keyword: string }>) {
      state.route = 'search'
      if (action.payload.siteId) {
        state.siteId = action.payload.siteId
      }
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
      state.keyword = action.payload.keyword
    },
    goToTag(state, action: PayloadAction<{ siteId?: string, pageId?: string, tag: string }>) {
      state.route = 'tag'
      if (action.payload.siteId) {
        state.siteId = action.payload.siteId
      }
      if (action.payload.pageId) {
        state.pageId = action.payload.pageId
      }
      state.tag = action.payload.tag
    },
  }
})

export const { setRoute, setSiteId, setPageId, setItemId, setKeyword, setTag, goToList, goToDetail, goToPreview, goToSearching, goToSearch, goToTag } = readerSlice.actions

export default readerSlice.reducer