import DataTable from "react-data-table-component";
import { formatDate } from "../../../utils/formatDate";
import axiosInstance from "../../../api/api_instance";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../utils/showToast";
import { useEffect, useState } from "react";
import { InitialBookingData } from "..";
import { AxiosError } from "axios";
import moment from "moment";
import Modal from "../../../components/modal";
import SendPhotoForm from "./sendPhotoForm";

const Booking = () => {
  const authHeader = useAuthHeader();
  const [bookingData, setBookingData] = useState(InitialBookingData);
  const [payment, setPayment] = useState(false);
  const [bundleId, setBundleId] = useState("");
  const [bundle, setBundle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  useEffect(() => {
    getBookingData();
  }, []);

  useEffect(() => {
    getBookingData();
  }, [payment]);

  const columns = [
    {
      name: "Tanggal Booking",
      selector: (row) =>
        new Date(row.bookingDate).toLocaleDateString("id-ID", options),
    },
    {
      name: "Bukti Pembayaran",
      cell: (row) => (
        <a
          href={row.proofOfPayment}
          target="blank"
          className="px-2 py-1 text-center bg-indigo-600 text-white rounded-lg"
        >
          Lihat Bukti
        </a>
      ),
      button: true,
    },
    {
      name: "Status Pembayaran",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "ID Product",
      selector: (row) => row.productId,
    },
    {
      name: "ID User",
      selector: (row) => row.userId,
    },
    {
      name: "Konfirmasi Pembayaran",
      cell: (row) => (
        <button
          onClick={async () => {
            await axiosInstance.put(
              `/book/${row.id}`,
              {
                paymentStatus: "completed",
              },
              {
                headers: {
                  Authorization: authHeader(),
                },
              }
            );
            setPayment(!payment);
            showToast("success", `Berhasil konfirmasi pembayaran`);
          }}
          target="blank"
          className="px-2 py-1 bg-green-600 text-white rounded-lg"
        >
          Konfirmasi
        </button>
      ),
      button: true,
    },
    {
      name: "Kirim Link Photo",
      cell: (row) => (
        <button
          onClick={() => {
            handleOpenModal();
            setBundleId(row.id);
          }}
          target="blank"
          className="px-2 py-1 bg-yellow-300 text-black rounded-lg"
        >
          Kirim Photo
        </button>
      ),
      button: true,
    },
  ];

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="Kirim Link Photo"
        subtitle="Silahkan Isi Link"
      >
        <SendPhotoForm id={bundleId} setBundle={setBundle} bundle={bundle} />
      </Modal>
      <DataTable
        columns={columns}
        data={bookingData}
        selectableRows
        pagination
      />
    </>
  );
};

export default Booking;
