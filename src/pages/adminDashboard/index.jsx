import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import Tabs from "../../components/tabs/tabs";
import Bundle from "./Bundle";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/api_instance";
import { AxiosError } from "axios";
import User from "./User";
import { useAuthHeader } from "react-auth-kit";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import showToast from "../../utils/showToast";

export const InitialBookingData = [
  {
    id: 0,
    bookingDate: "",
    paymentStatus: "",
    productId: 0,
    proofOfPayment: "",
    status: "",
    userId: "",
  },
];

const AdminDashboard = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  const checkIsAdmin = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
    setIsLoading(false);
  };

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get("/users", {
        headers: {
          Authorization: authHeader(),
        },
      });
      setUserData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        showToast("error", error.response.data.error);
      } else if (error && error instanceof Error)
        showToast("error", error.message);
    }
  };

  useEffect(() => {
    checkIsAdmin();
    // getBundleData();
    getUserData();
  }, []);

  const tabs = [
    {
      id: 1,
      tabTitle: "Data Booking ",
      title: "Booking",
      content: <Booking />,
    },
    {
      id: 2,
      tabTitle: "Data User",
      title: "User Data",
      content: <User data={userData} />,
    },
    {
      id: 3,
      tabTitle: "Daftar Paket",
      title: "",
      content: <Bundle />,
    },
  ];

  return (
    <>
      <NavBar bgnav={"#b7a58d"} role={role} />
      {isLoading ? (
        <Loader text="Memuat" />
      ) : (
        <div className="flex min-h-screen">
          <Tabs tabs={tabs} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default AdminDashboard;
