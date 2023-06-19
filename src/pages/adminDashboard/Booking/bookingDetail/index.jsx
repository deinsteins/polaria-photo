/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axiosInstance from "../../../../api/api_instance";
import { AxiosError } from "axios";
import Loader from "../../../../components/loader";
import { useAuthHeader } from "react-auth-kit";

const BookingDetail = ({ id }) => {
  const [bookingData, setBookingData] = useState({});
  const authHeader = useAuthHeader();

  const getBookingDataById = async () => {
    try {
      const response = await axiosInstance.get(`/book/${id}`, {
        headers: {
          Authorization: authHeader(),
        },
      });
      setBookingData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  useEffect(() => {
    getBookingDataById();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  return bookingData ? (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 min-w-[10rem]">
        <div className="flex">
          <span className="min-w-[12rem]">Nama Pemesan</span>
          <span>: {bookingData.userName}</span>
        </div>
        <div className="flex">
          <span className="min-w-[12rem]">Tanggal Acara</span>
          <span>: {formatDate(bookingData.bookingDate)}</span>
        </div>
        <div className="flex">
          <span className="min-w-[12rem]">Alamat Acara</span>
          <span>: {bookingData.location}</span>
        </div>
        <div className="flex">
          <span className="min-w-[12rem]">Status Pembayaran</span>
          <span>: {bookingData.paymentStatus}</span>
        </div>
        <div className="flex">
          <span className="min-w-[12rem]">Paket yang dipesan</span>
          <span>: {bookingData.productName}</span>
        </div>
        <div className="flex">
          <span className="min-w-[12rem]">Status Pesanan</span>
          <span>: {bookingData.status}</span>
        </div>
      </div>
    </div>
  ) : (
    <Loader text="Memuat" />
  );
};

export default BookingDetail;
