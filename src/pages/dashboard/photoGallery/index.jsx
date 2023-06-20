import { useEffect, useState } from "react";
import PhotoCard from "./photoCard";
import { InitialBookingData } from "../../adminDashboard";
import { useAuthHeader } from "react-auth-kit";
import axiosInstance from "../../../api/api_instance";
import { AxiosError } from "axios";
import showToast from "../../../utils/showToast";

const PhotoGallery = () => {
  const [bookingData, setBookingData] = useState(InitialBookingData);
  const authHeader = useAuthHeader();

  const getBookingDataByUserId = async () => {
    try {
      const response = await axiosInstance.get(`/book/user`, {
        headers: {
          Authorization: authHeader(),
        },
      });
      setBookingData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        showToast("error", error.response.data.error);
      } else if (error && error instanceof Error)
        showToast("error", error.message);
    }
  };

  useEffect(() => {
    getBookingDataByUserId();
  }, []);

  return (
    <div className="flex">
      {bookingData
        ? bookingData.map((data) => {
            return (
              <PhotoCard
                key={data.id}
                imgWidth="4rem"
                location={data.location}
                date={data.bookingDate}
                linkPhoto={data.linkPhoto}
                status={data.status}
              />
            );
          })
        : null}
    </div>
  );
};

export default PhotoGallery;
