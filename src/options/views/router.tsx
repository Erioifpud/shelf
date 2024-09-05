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

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route index path='/reader/' element={<ReaderPage />} />
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
