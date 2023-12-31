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
import Pp from "../dashboard/Participant/Pp";
import Feedback from "../dashboard/Participant/Feedback";
import PaymentHistory from "../dashboard/Participant/PaymentHistory";
import RegisteredCamp from "../dashboard/Participant/RegisteredCamp";
import Prop from "../dashboard/Professional/Prop";
import AcceptedCamp from "../dashboard/Professional/AcceptedCamp";
import AddCamp from "../dashboard/Organizer/AddCamp";
import AddUpcomingCamp from "../dashboard/Organizer/AddUpcomingCamp";
import ManageCamp from "../dashboard/Organizer/ManageCamp";
import ManageUpcomingCamp from "../dashboard/Organizer/ManageUpcomingCamp";
import CampDetails from "../page/CampDetails";
import ManageRegisteredCamp from "../dashboard/Organizer/ManageRegisteredCamp";
import PrivateRoute from "./PrivateRoute";
import OrganizerRoute from "./OrganizerRoute";
import ParticipantRoute from "./ParticipantRoute";
import ProfessionalRoute from "./ProfessionalRoute";
import UpcomingCampDetails from "../page/UpcomingCampDetails";

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
        element: (
          <PrivateRoute>
            <AvailableCamp />
          </PrivateRoute>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "camp-details/:campId",
        element: (
          <PrivateRoute>
            <CampDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "upcoming-camp-details/:campId",
        element: (
          <PrivateRoute>
            <UpcomingCampDetails />
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "organizer-profile",
        element: (
          <OrganizerRoute>
            <Organizer />
          </OrganizerRoute>
        ),
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
            path: "add-upcoming-camp",
            element: <AddUpcomingCamp />,
          },
          {
            path: "manage-camp",
            element: <ManageCamp />,
          },
          {
            path: "manage-registered-camp",
            element: <ManageRegisteredCamp />,
          },
          {
            path: "manage-upcoming-camp",
            element: <ManageUpcomingCamp />,
          },
        ],
      },
      {
        path: "participant-profile",
        element: (
          <ParticipantRoute>
            <Participant />
          </ParticipantRoute>
        ),
        children: [
          {
            index: true,
            path: "profile",
            element: <Pp></Pp>,
          },
          {
            path: "registered-camp",
            element: <RegisteredCamp />,
          },
          {
            path: "payment-history",
            element: <PaymentHistory />,
          },
          {
            path: "feedback-and-ratings",
            element: <Feedback />,
          },
        ],
      },
      {
        path: "professional-profile",
        element: (
          <ProfessionalRoute>
            <Professional />
          </ProfessionalRoute>
        ),
        children: [
          {
            index: true,
            path: "profile",
            element: <Prop></Prop>,
          },
          {
            path: "accepted-camp",
            element: <AcceptedCamp />,
          },
        ],
      },
    ],
  },
]);

export default router;
