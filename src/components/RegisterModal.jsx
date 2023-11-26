import { useState } from "react";
import toast from "react-hot-toast";
import axiosPublic from "../config/axios.config";
import useAuth from "../hook/useAuth";

const RegisterModal = ({ camp }) => {
  const { campName, date, time, fee, _id } = camp;
  const [modal, setModal] = useState(0);
  const { user } = useAuth();
  const Register = async () => {
    const registerBody = { campId: _id, email: user?.email };
    axiosPublic.post(`/registercamp`, registerBody).then((r) => {
      r.data._id ? toast.success("Registration successfull") : null;
      setModal(0);
    });
  };
  const formData = [
    { label: "Camp Name", field: "campName", value: `${campName}` },
    { label: "Camp Fee", field: "fee", value: `${fee}` },
    { label: "Date", field: "date", value: `${date}` },
    { label: "Time", field: "time", value: `${time}` },
  ];
  return (
    <div>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="btn-small"
        type="button"
        onClick={() => setModal(1)}
      >
        Join now
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          modal ? "block" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update this Camp Information
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setModal(0)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <div className="">
                <form className="space-y-1">
                  {formData.map((e) => (
                    <label className="block" key={e.field}>
                      <span className="block text-sm font-medium text-slate-700">
                        {e.label}
                      </span>
                      <p className="form-input">{e.value}</p>
                    </label>
                  ))}
                  {/* <div className="grid pb-5 pt-3">
                    <input
                      onClick={() => setSubmit(0)}
                      className="btn-primary"
                      type="submit"
                      value={`${submit ? "Submit" : "Submiting..."}`}
                    />
                  </div> */}
                </form>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={Register}
                data-modal-hide="default-modal"
                type="button"
                className="btn-primary"
              >
                Register
              </button>
              <button
                onClick={() => setModal(0)}
                data-modal-hide="default-modal"
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
