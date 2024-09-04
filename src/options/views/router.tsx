import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import HomePage from './Home';
import EditPage from './Edit';
import AppLayout from '~options/AppLayout';
import SiteEdit from './Edit/pages/SiteEdit';
import SiteSelect from './Edit/pages/SiteSelect';
import CommonEdit from './Edit/pages/CommonEdit';
import PageEdit from './Edit/pages/PageEdit';
import PageEditDrawer from './Edit/pages/PageEditDrawer';
import RulesEdit from './Edit/pages/RulesEdit';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path="/edit" element={<EditPage />}>
        <Route path="" element={<SiteSelect />}>
          <Route path=":id" element={<SiteEdit />}>
            <Route index path="common" element={<CommonEdit />} />
            <Route path="page" element={<PageEdit />}>
              <Route path=":pageId" element={<PageEditDrawer />} />
            </Route>
            <Route path="list" element={<RulesEdit ruleName="listRules" />}></Route>
            <Route path="detail" element={<RulesEdit ruleName="detailRules" />}></Route>
            <Route path="preview" element={<RulesEdit ruleName="previewRules" />}></Route>
            <Route path="search" element={<RulesEdit ruleName="searchRules" />}></Route>
            <Route path="tag" element={<RulesEdit ruleName="tagRules" />}></Route>
          </Route>
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to="/home" replace={true} />}
      />
    </Route>
  )
)
