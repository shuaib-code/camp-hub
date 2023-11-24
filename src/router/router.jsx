import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../page/Home";
import Error from "../page/Error";
import Login from "../page/Login";
import Register from "../page/Register";
import Contact from "../page/Contact";
import AvailableCamp from "../page/AvailableCamp";
import Dashboard from "../dashboard/Dashboard";
import Organizer from "../dashboard/Organizer/Organizer";
import Participant from "../dashboard/Participant/Participant";
import Professional from "../dashboard/Professional/Professional";
import Op from "../dashboard/Organizer/Op";
import AddCamp from "../dashboard/Organizer/AddCamp";
import ManageCamp from "../dashboard/Organizer/ManageCamp";

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
    children: [
      {
        path: "organizer-profile",
        element: <Organizer />,
        children: [
          {
            index: true,
            path: "profile",
            element: <Op></Op>,
          },
          {
            path: "add-a-camp",
            element: <AddCamp />,
          },
          {
            path: "manage-camp",
            element: <ManageCamp />,
          },
        ],
      },
      {
        path: "participant-profile",
        element: <Participant />,
      },
      {
        path: "professional-profile",
        element: <Professional />,
      },
    ],
  },
]);

export default router;
