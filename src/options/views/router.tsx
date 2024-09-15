import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import HomePage from './Home';
import EditPage from './Edit';
import ReaderPage from './Reader';
import AppLayout from '~options/AppLayout';
import SiteEdit from './Edit/pages/SiteEdit';
import SiteSelect from './Edit/pages/SiteSelect';
import CommonEdit from './Edit/pages/CommonEdit';
import PageEdit from './Edit/pages/PageEdit';
import PageEditDrawer from './Edit/pages/PageEditDrawer';
import RuleEditDrawer from './Edit/pages/RuleEditDrawer';
import RulesEdit from './Edit/pages/RulesEdit';
import ListPage from './Reader/pages/List';
import SearchPage from './Reader/pages/Search';
import SearchResultPage from './Reader/pages/SearchResult';
import DetailPage from './Reader/pages/Detail';
import PreviewPage from './Reader/pages/Preview';

// /reader/:siteId/:pageId - 列表页
// /reader/:siteId/:pageId/search - 搜索输入页
// /reader/:siteId/:pageId/search/:keyword - 搜索结果页
// /reader/:siteId/:pageId/detail/:itemId - 详情页
// /reader/:siteId/:pageId/detail/:itemId/chapter/:chapterId - 阅读页
// /reader/:siteId/:pageId/detail/:itemId/chapter/:chapterId/:page - 阅读页
export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/reader' element={<ReaderPage />}>
        <Route path=':siteId/:pageId/detail/:itemId/chapter/:chapterId/:page' element={<PreviewPage />}></Route>
        <Route path=':siteId/:pageId/detail/:itemId/chapter/:chapterId' element={<PreviewPage />}></Route>
        <Route path=':siteId/:pageId/detail/:itemId' element={<DetailPage />}></Route>
        <Route path=':siteId/:pageId/search/:keyword' element={<SearchResultPage />}></Route>
        <Route path=':siteId/:pageId/search' element={<SearchPage />}></Route>
        <Route index path=':siteId/:pageId' element={<ListPage />}></Route>
      </Route>
      <Route path="/edit" element={<EditPage />}>
        <Route path="" element={<SiteSelect />}>
          <Route path=":id" element={<SiteEdit />}>
            <Route index path="common" element={<CommonEdit />} />
            <Route path="page" element={<PageEdit />}>
              <Route path=":pageId" element={<PageEditDrawer />} />
            </Route>
            {/* TODO: 把映射关系整理到 type */}
            <Route path="list" element={<RulesEdit ruleName="listRules" />}>
              <Route path=":ruleId" element={<RuleEditDrawer ruleName="listRules" />} />
            </Route>
            <Route path="detail" element={<RulesEdit ruleName="detailRules" />}>
              <Route path=":ruleId" element={<RuleEditDrawer ruleName="detailRules" />} />
            </Route>
            <Route path="preview" element={<RulesEdit ruleName="previewRules" />}>
              <Route path=":ruleId" element={<RuleEditDrawer ruleName="previewRules" />} />
            </Route>
            <Route path="search" element={<RulesEdit ruleName="searchRules" />}>
              <Route path=":ruleId" element={<RuleEditDrawer ruleName="searchRules" />} />
            </Route>
            <Route path="tag" element={<RulesEdit ruleName="tagRules" />}>
              <Route path=":ruleId" element={<RuleEditDrawer ruleName="tagRules" />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/" replace={true} />}
      />
    </Route>
  )
)
