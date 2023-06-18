import { AxiosError } from "axios";
import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/api_instance";
import showToast from "../../utils/showToast";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../redux/actions/actions";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    setError("");
    try {
      const response = await axiosInstance.post("/login", values);
      dispatch(setUserRole(response.data.role));
      sessionStorage.setItem("role", response.data.role);

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: values.email },
      });
      navigate("/");
    } catch (error) {
      if (error && error instanceof AxiosError) {
        setError(error.message);
      } else if (error && error instanceof Error) setError(error.message);
      showToast("error", "Email atau password salah");
    }
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <div className="w-full h-screen bg-gray-800 absolute top-0">
          <div className="bg-[#fff7ed] flex flex-col mx-auto px-8 py-10 w-[30%] mt-20 text-center gap-8 shadow-lg rounded-md">
            <h2 className="font-bold text-xl">Welcome to Polaria</h2>
            <p className="text-gray-600">
              Silahkan masukan username dan password anda
            </p>
            {/* Passing handleSubmit parameter tohtml form onSubmit property */}
            <form
              className="flex flex-col gap-4 text-left"
              noValidate
              onSubmit={handleSubmit}
            >
              <span className="font-bold">Login</span>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="rounded shadow-sm p-2"
                placeholder="Masukan username atau email"
                id="email"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.email && touched.email && errors.email}
              </p>
              {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="rounded shadow-sm p-2"
                placeholder="Masukan Password"
              />
              {/* If validation is not passed show errors */}
              <p className="error">
                {errors.password && touched.password && errors.password}
              </p>
              {/* Click on submit button to submit the form */}
              <button
                className="bg-[#ffe1a5] px-2 py-3 rounded-lg hover:bg-[#ffc655]"
                type="submit"
              >
                Login
              </button>
            </form>
            <span>
              Belum punya akun?{" "}
              <a href="register" className="text-blue-500 hover:text-blue-700">
                Daftar
              </a>
            </span>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
