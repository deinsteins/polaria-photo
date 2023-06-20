import { useIsAuthenticated } from "react-auth-kit";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import Tabs from "../../components/tabs/tabs";
import { Navigate } from "react-router-dom";
import BookingHistory from "./bookingHistory";
import PhotoGallery from "./photoGallery";

const Dashboard = () => {
  const role = sessionStorage.getItem("role");
  const isAuthenticated = useIsAuthenticated();

  const tabs = [
    {
      id: 1,
      tabTitle: "Riwayat Booking",
      title: "Riwayat Booking",
      content: <BookingHistory />,
    },
    {
      id: 3,
      tabTitle: "Galeri Photo",
      title: "",
      content: <PhotoGallery />,
    },
  ];

  return (
    <>
      <NavBar bgnav={"#b7a58d"} role={role} />
      {isAuthenticated() ? (
        <div className="flex">
          <Tabs tabs={tabs} />
        </div>
      ) : (
        <Navigate to="/login" />
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
