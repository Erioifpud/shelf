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

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path="/edit" element={<EditPage />}>
        <Route path="" element={<SiteSelect />}>
          <Route path=":id" element={<SiteEdit />}>
            <Route index path="common" element={<CommonEdit />} />
            <Route path="page" element={<PageEdit />} />
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
