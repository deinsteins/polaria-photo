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

const InitialBookingData = [
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
  const [bundleData, setBundleData] = useState([]);
  const [userData, setUserData] = useState({});
  const [bookingData, setBookingData] = useState(InitialBookingData);
  const [error, setError] = useState(false);
  const authHeader = useAuthHeader();

  const getBundleData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setBundleData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        setError(error.response.data.error);
      } else if (error && error instanceof Error) setError(error.message);
    }
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
        setError(error.response.data.error);
      } else if (error && error instanceof Error) setError(error.message);
    }
  };

  const getBookingData = async () => {
    try {
      const response = await axiosInstance.get("/book", {
        headers: {
          Authorization: authHeader(),
        },
      });
      setBookingData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        setError(error.response.data.error);
      } else if (error && error instanceof Error) setError(error.message);
    }
  };

  useEffect(() => {
    getBundleData();
    getUserData();
    getBookingData();
  }, []);

  const tabs = [
    {
      id: 1,
      tabTitle: "Data Booking ",
      title: "Booking",
      content: <Booking data={bookingData} />,
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
      content: <Bundle data={bundleData} />,
    },
  ];

  return (
    <>
      <NavBar bgnav={"#b7a58d"} />
      <div className="flex min-h-screen">
        <Tabs tabs={tabs} />
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
