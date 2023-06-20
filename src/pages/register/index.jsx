import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/api_instance";
import { useNavigate } from "react-router-dom";
import showToast from "../../utils/showToast";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Alamat email tidak valid")
        .required("Email wajib diisi"),
      name: Yup.string().required("Nama wajib diisi"),
      phone: Yup.string().required("Nomor telepon wajib diisi"),
      password: Yup.string()
        .required("Password wajib diisi")
        .min(8, "Password harus terdiri dari setidaknya 8 karakter"),
      confirmPassword: Yup.string()
        .required("Konfirmasi Password wajib diisi")
        .oneOf([Yup.ref("password"), null], "Password harus sama"),
    }),
    onSubmit: async (values) => {
      try {
        await axiosInstance.post("/register", values);
        showToast("success", "Berhasil mendaftar akun");
        navigate("/login");
      } catch (error) {
        if (error && error instanceof AxiosError) {
          showToast("error", error.response.data.error);
        } else if (error && error instanceof Error)
          showToast("error", error.message);
        showToast("error", error.response.data.error);
      }
    },
  });
  return (
    <div className="w-full h-screen bg-gray-800 absolute top-0">
      <div className="bg-[#fff7ed] flex flex-col mx-auto px-8 py-10 w-[50%] mt-20 text-center gap-8 shadow-lg rounded-md">
        <h2 className="font-bold text-xl">Selamat datang di Polaria</h2>
        <p className="text-gray-600">
          Silakan masukkan data berikut untuk mendaftar akun
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <input
                className="rounded shadow-sm p-2"
                type="text"
                placeholder="Masukkan email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-left ml-2">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="rounded shadow-sm p-2"
                type="text"
                placeholder="Masukkan nama Anda"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-left ml-2">
                  {formik.errors.name}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="rounded shadow-sm p-2"
                type="text"
                placeholder="Masukkan nomor telepon"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-left ml-2">
                  {formik.errors.phone}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="rounded shadow-sm p-2"
                type="password"
                placeholder="Masukkan Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-left ml-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="rounded shadow-sm p-2"
                type="password"
                placeholder="Ulangi Password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <div className="text-red-500 text-left ml-2">
                    {formik.errors.confirmPassword}
                  </div>
                )}
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <button
              className="bg-[#ffe1a5] px-2 py-3 rounded-lg hover:bg-[#ffc655]"
              type="submit"
            >
              Daftar
            </button>
            <span>
              Sudah memiliki akun?{" "}
              <a href="login" className="text-blue-500 hover:text-blue-700">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
