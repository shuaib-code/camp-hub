import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import WelcomeBanner from "../components/banner/WelcomeBanner";
import { BiArrowBack } from "react-icons/bi";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import axiosPublic from "../config/axios.config";
import { Helmet } from "react-helmet";

const Register = () => {
  const [role, setRole] = useState("participant");
  const { register: createUser, setProfile } = useAuth();
  const navigate = useNavigate();
  const roleList = [
    { value: "participant", role: "Participant" },
    { value: "professional", role: "Healthcare Professional" },
    { value: "organizer", role: "Organizer" },
  ];

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.userName.value;
    const url = form.url.value;
    const email = form.email.value;
    const password = form.password.value;

    const specialCharactersPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

    if (!specialCharactersPattern.test(password)) {
      toast.error("Password should contain al least 1 special caracter");
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password should have at least 1 Uppercase");
    } else if (!/[0-9]/.test(password)) {
      toast.error("Password should contain at least 1 numeric alpabet");
    }

    createUser(email, password)
      .then(() => {
        setProfile(name, url)
          .then(() => {
            navigate(`/dashboard/${role}-profile/profile`);
          })
          .catch(() => toast.error("Something went worng."));
        axiosPublic
          .post("/register", { name, url, email, password, role })
          .then((r) =>
            r.data._id ? toast.success("Registration Successfull") : null
          );
      })
      .catch(() => toast.error("Something went worng."));
  };

  const form = (
    <div className="my-6">
      <form className="space-y-5" onSubmit={handleForm}>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="userName"
            className="form-input"
            placeholder="enter your full name"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Photo URL
          </span>
          <input
            type="text"
            name="url"
            className="form-input"
            placeholder="enter you profile picture url"
            required
          />
        </label>
        <label className="block">
          <span className="block mb-2 text-sm font-medium text-slate-700">
            Who are you?
          </span>
          <select
            onChange={(e) => setRole(e.target.value)}
            id="role"
            className="form-input"
          >
            {roleList.map((e) => (
              <option key={e.value} value={e.value}>
                {e.role}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="enter your password"
            required
          />
        </label>
        <label className="block">
          <input
            type="submit"
            className="btn-primary w-full"
            value="Continue"
          />
        </label>
      </form>
    </div>
  );
  const register = (
    <div className="col-span-1 p-7 md:p-16 lg:p-16">
      <div className="flex justify-start">
        <Logo></Logo>
      </div>
      <div className="my-10">
        <Link to="/">
          <button className="flex justify-center items-center gap-2 font-medium text-sm">
            <BiArrowBack className="text-lg"></BiArrowBack> Home
          </button>
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-sm my-2 font-medium">
          Already have an account?
          <Link to="/login" className="text-primary mx-3">
            Log in
          </Link>
        </p>
      </div>
      {form}
    </div>
  );
  return (
    <div className="font-inter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Helmet>
        <title>CampHUB | Register</title>
      </Helmet>
      {register}
      <div className="md:col-span-1 lg:col-span-2">
        <WelcomeBanner></WelcomeBanner>
      </div>
      {/* <Toaster position="top-center"></Toaster> */}
    </div>
  );
};

export default Register;
