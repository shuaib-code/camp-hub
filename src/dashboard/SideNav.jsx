import { NavLink } from "react-router-dom";
import useRole from "../hook/useRole";

const SideNav = () => {
  const role = useRole();
  const navList = [
    { name: "Profile", path: "profile" },
    { name: "Add Camp", path: "add-a-camp" },
    { name: "Manage Camp", path: "manage-camp" },
  ];

  console.log(role);
  return (
    <div>
      <ul className="font-medium">
        {navList.map((e) => (
          <NavLink
            key={e.name}
            to={e.path}
            className={({ isActive }) =>
              isActive ? "side-active-nav" : "side-rest-nav"
            }
          >
            {e.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
