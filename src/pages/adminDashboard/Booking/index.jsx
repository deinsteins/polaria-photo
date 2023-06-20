import DataTable from "react-data-table-component";
import axiosInstance from "../../../api/api_instance";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../utils/showToast";
import { useEffect, useState } from "react";
import { InitialBookingData } from "..";
import { AxiosError } from "axios";
import Modal from "../../../components/modal";
import SendPhotoForm from "./sendPhotoForm";
import BookingDetail from "./bookingDetail";
import { formatDate } from "../../../utils/formatDate";

const Booking = () => {
  const authHeader = useAuthHeader();
  const [bookingData, setBookingData] = useState(InitialBookingData);
  const [payment, setPayment] = useState(false);
  const [bundleId, setBundleId] = useState("");
  const [bundle, setBundle] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
      selector: (row) => formatDate(row.bookingDate),
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
    {
      name: "Lihat Detail",
      cell: (row) => (
        <button
          onClick={() => {
            setDetailModalOpen(true);
            setBundleId(row.id);
          }}
          target="blank"
          className="px-2 py-1 bg-orange-500 text-white rounded-lg"
        >
          Lihat Detail
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
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="Detail Booking"
        subtitle=""
      >
        <BookingDetail id={bundleId} />
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
