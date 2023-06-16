import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import Tabs from "../../components/tabs/tabs";

const tabs = [
  {
    id: 1,
    tabTitle: "Riwayat Booking",
    title: "Riwayat Booking",
    content: "",
  },
  {
    id: 2,
    tabTitle: "Status Booking",
    title: "Status Booking",
    content: "",
  },
  {
    id: 3,
    tabTitle: "Galeri Photo",
    title: "Galeri Photo",
    content: "",
  },
];

const Dashboard = () => {
  return (
    <>
      <NavBar bgnav={"#b7a58d"} />
      <div className="flex">
        <Tabs tabs={tabs} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
