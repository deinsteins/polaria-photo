import { useEffect, useState } from "react";
import Modal from "../../../components/modal";
import BookingForm from "../bookingForm";
import axiosInstance from "../../../api/api_instance";
import { AxiosError } from "axios";

const PriceCard = ({ id, title, price, children, detail }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={title}
        subtitle="Silahkan Isi Data Berikut"
      >
        <BookingForm id={id} />
      </Modal>
      <div className="flex flex-col gap-6 bg-blue-100 px-8 py-8 shadow-lg cursor-pointer hover:bg-blue-200 hover:shadow-2xl hover:rounded">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className="text-xl font-bold">
          <span className="mr-1 text-2xl">Rp</span>
          {price}
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

export default PriceCard;
