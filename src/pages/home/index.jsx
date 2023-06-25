import { useEffect, useState } from "react";
import Card from "../../components/card";
import Footer from "../../components/footer";
import Hero from "../../components/hero";
import NavBar from "../../components/navbar";
import Quote from "../../components/quote";
import { AiOutlineLine } from "react-icons/ai";
import { useSelector } from "react-redux";

const Home = () => {
  const [data, setData] = useState("");
  const userRole = useSelector((state) => state.role);
  const role = sessionStorage.getItem("role");

  const getData = async () => {
    try {
      const response = await fetch("data/photos.json");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full h-full">
      <header className="absolute top-0 z-50 w-full">
        <NavBar bgnav={"#ad9b7900"} role={role} userRole={userRole} />
      </header>
      <Hero />
      <div className="bg-[#EEEBE7] py-10 sm:py-28 px-6 sm:px-60 text-center font-semibold">
        <Quote />
        <AiOutlineLine className="mx-auto mt-6 sm:mt-16" size={40} />
      </div>
      <div className="px-4 sm:px-16 py-6 sm:py-20">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-between sm:justify-center md:justify-center">
          {data &&
            data.photos.map((photo, index) => {
              return (
                <a href="" key={index}>
                  <Card
                    image={photo.image}
                    title={photo.title}
                    imgWidth={"280px"}
                  />
                </a>
              );
            })}
        </div>
        <div className="mt-8 sm:mt-16 w-fit mx-auto">
          <a
            className="text-gray-700 hover:text-black mx-auto"
            href="portofolio"
          >
            Lihat Semua Fotograf
          </a>
          <AiOutlineLine className="mx-auto" size={40} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
