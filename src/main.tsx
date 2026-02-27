import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FilterPage, { loader } from "./pages/FilterPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
    loader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);