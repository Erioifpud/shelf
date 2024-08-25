import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import HomePage from './Home';
import EditPage from './Edit';
import AppLayout from '~options/AppLayout';
import CommonEdit from './Edit/pages/CommonEdit';
import SiteSelect from './Edit/pages/SiteSelect';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path="/edit" element={<EditPage />}>
        <Route index path="" element={<SiteSelect />} />
        <Route path=":id" element={<CommonEdit />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to="/home" replace={true} />}
      />
    </Route>
  )
)
