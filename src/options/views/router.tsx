import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import HomePage from './Home';
import EditPage from './Edit';
import AppLayout from '~options/AppLayout';

export const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route index path='/' element={<HomePage />} />
      <Route path="/edit" element={<EditPage />} />
      <Route
        path="*"
        element={<Navigate to="/home" replace={true} />}
      />
    </Route>
  )
)
