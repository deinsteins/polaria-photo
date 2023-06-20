import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";
import PriceCard from "./priceCard";
import axiosInstance from "../../api/api_instance";
import { AxiosError } from "axios";
import showToast from "../../utils/showToast";

const Pricing = () => {
  const [bundle, setBundle] = useState([]);
  const role = sessionStorage.getItem("role");

  const getBundleData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setBundle(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        showToast("error", error.response.data.error);
      } else if (error && error instanceof Error) {
        showToast("error", error.message);
      }
    }
  };

  useEffect(() => {
    getBundleData();
  }, []);

  return (
    <div className="w-full h-full">
      <NavBar bgnav={"#b7a58d"} role={role} />
      <h1 className="text-3xl font-bold text-center mt-4">
        Silahkan Pilih Paket yang diinginkan
      </h1>
      <div className="flex justify-center gap-4 mt-8 py-8 px-4 sm:px-0">
        {bundle.map((bundle) => {
          const detailsArray = bundle.details;
          return (
            <PriceCard
              id={bundle.id}
              key={bundle.id}
              price={bundle.price}
              title={bundle.name}
              detail="Yang didapat:"
            >
              <ul className="list-disc list-inside">
                {Array.isArray(detailsArray) &&
                  detailsArray.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
              </ul>
            </PriceCard>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;
