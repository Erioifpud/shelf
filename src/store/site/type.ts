// export enum DisplayMode {
//   CARD, // 左右布局，左图片、右信息，右上标题、右下描述、时间等
//   TEXT, // 纯文本列表
//   TAG, // flex 自动换行的标签胶囊
//   COLLECTION, // 大图 + 左下角小标题
//   WATERFALL, // 中图 + 左下角小标题
// }

export type DisplayMode = 'card' | 'collection' | 'tag' | 'text' | 'waterfall'

export interface QueryItem {
  key: string,
  value: string,
  type: 'query' | 'param'
}

export interface SubPage {
  id: string
  title: string
  query: QueryItem[]
}

export interface SelectAction {
	selector: string,
  function: string,
  param: string,
  regex: string,
  replace: string
}

export interface ListRule {
  id: string
  name: string

  // 列表项的规则（通常只要写 selector，捕获到元素就行）
  // 单个项目的其他信息通过其他规则获取
  item: SelectAction
  // 以下是其他规则，会应用在单个 item 上
  // 列表项的 id
  idCode: SelectAction
  // 标题
  title: SelectAction
  // 封面
  cover: SelectAction
  // 封面宽度
  coverWidth: SelectAction
  // 封面高度
  coverHeight: SelectAction
  // 大图
  largeImage: SelectAction
  // 视频
  video: SelectAction
  // 分类
  category: SelectAction
  // 作者
  author: SelectAction
  // 上传者
  uploader: SelectAction
  // 上传日期
  publishDate: SelectAction
  // 更新日期
  updateDate: SelectAction
  // 评分
  rating: SelectAction
  // 周期
  duration: SelectAction
  // 喜欢数
  likes: SelectAction
  // 观看数
  views: SelectAction
  // 总图片数
  totalPictures: SelectAction
  // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
  secondPageUrl: SelectAction

  // 分页规则
  pagerRule: {
    // 下一页的按钮
    nextPage: SelectAction
  }

  headerRule: {
    httpHeaders: string
    pictureHeaders: string
  }
}

export interface DetailRule {
  id: string
  name: string

  // 标题
  title: SelectAction
  // 描述（详情新增）
  description: SelectAction
  // 封面
  cover: SelectAction
  // 封面宽度
  coverWidth: SelectAction
  // 封面高度
  coverHeight: SelectAction
  // 大图
  largeImage: SelectAction
  // 视频
  video: SelectAction
  // 分类
  category: SelectAction
  // 作者
  author: SelectAction
  // 上传者
  uploader: SelectAction
  // 上传日期
  publishDate: SelectAction
  // 更新日期
  updateDate: SelectAction
  // 评分
  rating: SelectAction
  // 周期
  duration: SelectAction
  // 喜欢数
  likes: SelectAction
  // 观看数
  views: SelectAction
  // 总图片数
  totalPictures: SelectAction
  // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
  secondPageUrl: SelectAction

  // 标签（详情新增）
  tagRule: {
    // 选择标签所在的容器元素
    item: SelectAction
    // 标签名称
    name: SelectAction
    // 标签链接
    url: SelectAction
  }

  // 详情页的图片
  pictureRule: {
    // 选择图片所在的容器元素
    item: SelectAction
    // 图片缩略图
    thumbnail: SelectAction
    // 图片地址（在定义了 link 后，url 会在新页面进行匹配）
    url: SelectAction
    // 图片所在页面（如果图片在新页面打开）
    link: SelectAction
  }

  // 详情页的视频
  videoRule: {
    // 选择视频所在的容器元素
    item: SelectAction
    // 视频缩略图
    thumbnail: SelectAction
    // 视频地址（在定义了 link 后，url 会在新页面进行匹配）
    url: SelectAction
    // 视频所在页面（如果视频在新页面打开）
    link: SelectAction
  }

  // 详情页的章节
  chapterRule: {
    // 选择章节所在的容器元素
    item: SelectAction
    // 章节 id
    idCode: SelectAction
    // 章节标题
    title: SelectAction
    // 章节日期
    date: SelectAction
    // 章节跳转的链接
    url: SelectAction
  }

  // 详情页的评论
  commentRule: {
    // 选择评论所在的容器元素
    item: SelectAction
    // 评论者头像
    avatar: SelectAction
    // 评论者名称
    username: SelectAction
    // 评论日期
    date: SelectAction
    // 评论内容
    content: SelectAction
  }

  // 分页规则
  pagerRule: {
    // 下一页的按钮
    nextPage: SelectAction
  }

  headerRule: {
    httpHeaders: string
    pictureHeaders: string
    videoHeaders: string
  }
}

// 浏览页，对应的是 yea 的 GalleryRule
// TODO: 要考虑的是，如果同时设置了 picture 和 video 规则，那么应该做切换显示，还是按优先级取舍
// 帖子模式直接使用详情页去预览
export interface PreviewRule {
  id: string
  name: string

  // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
  secondPageUrl: SelectAction

  pictureRule: {
    // 图片的容器
    item: SelectAction
    // 预览页的图片
    picture: SelectAction
    // 总图片数（暂不清楚有什么用）
    totalPictures: SelectAction
    // 总页数
    totalPages: SelectAction
    // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
    secondPageUrl: SelectAction
  }

  // 暂不考虑有多个视频的情况
  videoRule: {
    // 视频的容器
    item: SelectAction
    // 视频标题
    title: SelectAction
    // 视频封面
    cover: SelectAction
    // 视频 url
    url: SelectAction
  }

  headerRule: {
    httpHeaders: string
    pictureHeaders: string
    videoHeaders: string
  }
}

// 这是搜索结果页的规则
export interface SearchRule {
  id: string
  name: string

  // 列表项的容器
  item: SelectAction
  // id
  idCode: SelectAction
  // 标题
  title: SelectAction
  // 封面
  cover: SelectAction
  // 封面宽度
  coverWidth: SelectAction
  // 封面高度
  coverHeight: SelectAction
  // 大图
  largeImage: SelectAction
  // 视频
  video: SelectAction
  // 分类
  category: SelectAction
  // 作者
  author: SelectAction
  // 上传者
  uploader: SelectAction
  // 上传日期
  publishDate: SelectAction
  // 更新日期
  updateDate: SelectAction
  // 评分
  rating: SelectAction
  // 周期
  duration: SelectAction
  // 喜欢数
  likes: SelectAction
  // 观看数
  views: SelectAction
  // 总图片数
  totalPictures: SelectAction
  // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
  secondPageUrl: SelectAction

  // 分页规则
  pagerRule: {
    // 下一页的按钮
    nextPage: SelectAction
  }

  headerRule: {
    httpHeaders: string
    pictureHeaders: string
  }
}

// 标签页的规则
export interface TagRule {
  id: string
  name: string

  // 列表项的容器
  item: SelectAction
  // id
  idCode: SelectAction
  // 标题
  title: SelectAction
  // 封面
  cover: SelectAction
  // 封面宽度
  coverWidth: SelectAction
  // 封面高度
  coverHeight: SelectAction
  // 大图
  largeImage: SelectAction
  // 视频
  video: SelectAction
  // 分类
  category: SelectAction
  // 作者
  author: SelectAction
  // 上传者
  uploader: SelectAction
  // 上传日期
  publishDate: SelectAction
  // 更新日期
  updateDate: SelectAction
  // 评分
  rating: SelectAction
  // 周期
  duration: SelectAction
  // 喜欢数
  likes: SelectAction
  // 观看数
  views: SelectAction
  // 总图片数
  totalPictures: SelectAction
  // 一些内容不在当前页面，在二级页面，设置后以上规则都只会对二级页面生效
  secondPageUrl: SelectAction

  // 分页规则
  pagerRule: {
    // 下一页的按钮
    nextPage: SelectAction
  }

  headerRule: {
    httpHeaders: string
    pictureHeaders: string
  }
}

export interface Page {
  id: string
  title: string
  flags: string

  // 实时搜索建议，启用后每次输入关键字都会调用搜索接口（会去抖）将结果列出来
  searchSuggestion: boolean
  // 搜索参数的配置
  searchParams: QueryItem
  // 其他参数的配置
  query: QueryItem[]
  // 二级页面（没有搜索功能）
  subPages: SubPage[]

  detail: {
    url: string
    rule: string
    headers: string
  }

  preview: {
    url: string
    rule: string
    headers: string
  }

  list: {
    url: string
    rule: string
    displayMode: DisplayMode
    headers: string
  }

  tag: {
    url: string
    rule: string
    displayMode: DisplayMode
    headers: string
  }

  search: {
    url: string
    rule: string
    displayMode: DisplayMode
    headers: string
  }
}

export interface Site {
  id: string
  common: {
    siteName: string
    siteIcon: string
    author: string
    version: string
    description: string

    // 需要登录时打开这个页面登录
    // 不过插件应该获取不了 iframe 的 cookie，可能需要用户自己填写
    loginUrl: string
    cookie: string
    token: string

    // order: 'ASC' | 'DESC'
    flags: string
  }

  // 站点下的页面，相当于 group 的抽象概念
  // 一个页面下，可以有多种功能页，但一类功能页只能配置一次，比如搜索页，只能配置一个
  pages: Page[]

  // 功能页的所有爬取策略
  detailRules: DetailRule[]
  previewRules: PreviewRule[]
  searchRules: SearchRule[]
  tagRules: TagRule[]
  listRules: ListRule[]
}

export interface RuleTypeMapper {
  detailRules: DetailRule,
  listRules: ListRule,
  previewRules: PreviewRule,
  searchRules: SearchRule,
  tagRules: TagRule
}

export type RuleProps = keyof RuleTypeMapper
