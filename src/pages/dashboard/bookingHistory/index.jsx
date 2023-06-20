import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "../../../api/api_instance";
import showToast from "../../../utils/showToast";
import { useAuthHeader } from "react-auth-kit";
import { AxiosError } from "axios";
import { InitialBookingData } from "../../adminDashboard";
import { formatDate } from "../../../utils/formatDate";

const columns = [
  {
    name: "Tanggal Booking",
    selector: (row) => formatDate(row.bookingDate),
  },
  {
    name: "Paket Yang di Booking",
    selector: (row) => row.productName,
  },
  {
    name: "Alamat Lokasi",
    selector: (row) => row.location,
  },
  {
    name: "Status Pembayaran",
    selector: (row) => row.paymentStatus,
  },
  {
    name: "Status Booking",
    selector: (row) => row.status,
  },
];

const BookingHistory = () => {
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
    <div className="h-screen">
      <DataTable
        columns={columns}
        data={bookingData}
        selectableRows
        pagination
      />
    </div>
  );
};

export default BookingHistory;
