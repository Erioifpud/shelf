import {
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import MainPage from './Main';

export const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />
  },
]);
