import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import Wrapper from "./wrapper";

const Portofolio = () => {
  const [portofolio, setPortofolio] = useState([]);
  const role = sessionStorage.getItem("role");

  const getportofolio = async () => {
    try {
      const response = await fetch("data/portofolio.json");
      console.log("run");
      const jsonData = await response.json();
      setPortofolio(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getportofolio();
  }, []);

  return (
    <div className="">
      <NavBar bgnav={"#b7a58d"} role={role} />
      {portofolio &&
      portofolio.portofolios &&
      portofolio.portofolios.length > 0 ? (
        portofolio.portofolios.map((portofolio, index) => (
          <Wrapper
            key={index}
            title={portofolio.title}
            primaryImg={portofolio.primaryImage}
            secondaryImg={portofolio.secondaryImage}
            reverse={index % 2 ? true : false}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Footer />
    </div>
  );
};

export default Portofolio;
