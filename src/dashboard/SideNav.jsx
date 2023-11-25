import { NavLink } from "react-router-dom";
import useRole from "../hook/useRole";

const SideNav = () => {
  const role = useRole();
  const navListOrg = [
    { name: "Profile", path: "profile" },
    { name: "Add Camp", path: "add-a-camp" },
    { name: "Add Upcoming Camp", path: "add-upcoming-camp" },
    { name: "Manage Camp", path: "manage-camp" },
    { name: "Manage Upcoming Camp", path: "manage-upcoming-camp" },
  ];
  const navListPart = [
    { name: "Profile", path: "profile" },
    { name: "Registerd Camp", path: "registered-camp" },
    { name: "Payment History", path: "payment-history" },
    { name: "Feedback and Ratings", path: "feedback-and-ratings" },
  ];
  const navListPro = [
    { name: "Profile", path: "profile" },
    { name: "Accepted Camp", path: "accepted-camp" },
  ];

  return (
    <div>
      <ul className="font-medium">
        {role === "organizer"
          ? navListOrg.map((e) => (
              <NavLink
                key={e.name}
                to={e.path}
                className={({ isActive }) =>
                  isActive ? "side-active-nav" : "side-rest-nav"
                }
              >
                {e.name}
              </NavLink>
            ))
          : null}
        {role === "participant"
          ? navListPart.map((e) => (
              <NavLink
                key={e.name}
                to={e.path}
                className={({ isActive }) =>
                  isActive ? "side-active-nav" : "side-rest-nav"
                }
              >
                {e.name}
              </NavLink>
            ))
          : null}
        {role === "professional"
          ? navListPro.map((e) => (
              <NavLink
                key={e.name}
                to={e.path}
                className={({ isActive }) =>
                  isActive ? "side-active-nav" : "side-rest-nav"
                }
              >
                {e.name}
              </NavLink>
            ))
          : null}
      </ul>
    </div>
  );
};

export default SideNav;
