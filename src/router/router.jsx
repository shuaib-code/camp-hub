import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Error from "../page/Error";
import Login from "../page/Login";
import Register from "../page/Register";
import Contact from "../page/Contact";
import AvailableCamp from "../page/AvailableCamp";
import Dashboard from "../dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "availableCamp",
        element: <AvailableCamp />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
