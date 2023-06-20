import { useState } from "react";
import Modal from "../../../components/modal";
import BookingForm from "../bookingForm";
import axiosInstance from "../../../api/api_instance";
import { AxiosError } from "axios";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../utils/showToast";
import UploadImageForm from "../UploadImage";
import moment from "moment-timezone";
import PropTypes from "prop-types";

const PriceCard = ({ id, title, price, children, detail }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authHeader = useAuthHeader();
  const formattedNumber = price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSuccessModalOpen = () => {
    setSuccessModalOpen(true);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedDate = moment.utc(values.bookingDateTime).format();
      const responses = await axiosInstance.post(
        `/products/${id}/book`,
        {
          bookingDate: formattedDate,
          location: values.location,
          paymentStatus: "pending",
          status: "belum selesai",
          proofOfPayment: "",
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      setBookingId(responses.data.id);
      setSubmitting(false);
      handleCloseModal();
      handleSuccessModalOpen();
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error === "Unauthorized"
          ? showToast("error", "Silahkan login terlebih dahulu")
          : showToast("error", error.response.data.error);
      } else if (error && error instanceof Error)
        showToast("error", error.response.data.error);
    }
  };

  const handleUpload = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("proofOfPayment", file);

      await uploadPaymentProof(formData);

      setSubmitting(false);
      handleCloseModal();
      handleSuccessModalClose();
    } catch (error) {
      setSubmitting(false);
      if (error && error instanceof AxiosError) {
        showToast("error", error.response.data.error);
      } else if (error && error instanceof Error) error.message;
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPaymentProof = async (formData) => {
    console.log(formData);
    try {
      await axiosInstance.put(`/book/${bookingId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authHeader(),
        },
      });
      showToast(
        "success",
        `Berhasil booking silahkan tunggu dikonfirmasi oleh admin`
      );
    } catch (error) {
      if (error && error instanceof AxiosError) {
        showToast("error", error.response.data.error);
      } else if (error && error instanceof Error) error.message;
    }
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={title}
        subtitle="Silahkan Isi Data Berikut"
      >
        <BookingForm id={id} onSubmit={handleSubmit} />
      </Modal>

      <Modal
        isOpen={successModalOpen}
        onClose={handleSuccessModalClose}
        title=""
        subtitle="Silahkan Lakukan Pembayaran Awal"
      >
        <UploadImageForm
          onUpload={handleUpload}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </Modal>

      <div className="flex flex-col gap-6 bg-blue-100 px-8 py-8 shadow-lg cursor-pointer hover:bg-blue-200 hover:shadow-2xl hover:rounded">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-xl font-bold">
          <span className="mr-1 text-2xl">Rp</span>
          {formattedNumber}
        </span>
        <button
          onClick={handleOpenModal}
          className="bg-blue-700 px-3 py-1 text-white rounded"
        >
          Pilih Paket Ini
        </button>
        <h4>{detail}</h4>
        {children}
      </div>
    </>
  );
};

PriceCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  children: PropTypes.node,
  detail: PropTypes.string,
};

export default PriceCard;
