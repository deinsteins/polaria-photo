import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../api/api_instance";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../utils/showToast";
import Modal from "../../../components/modal";

const validationSchema = Yup.object().shape({
  bookingDateTime: Yup.date().required("Booking date is required"),
});

const initialValues = {
  bookingDateTime: "",
};

const BookingForm = ({ id }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const authHeader = useAuthHeader();
  const createBooking = async ({ date }) => {
    try {
      await axiosInstance.post(
        `/products/${id}/book`,
        {
          bookingDate: date,
          paymentStatus: "pending",
          proofOfPayment: "",
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      showToast("success", `Berhasil booking silahkan lakukan pembayaran awal`);
      handleOpenModal();
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  const formattedDateString = (datetime) => {
    const originalDate = new Date(datetime);
    const formattedDateString = new Date(
      originalDate.getFullYear(),
      originalDate.getMonth(),
      originalDate.getDate() + 1,
      10, // hours
      0, // minutes
      0, // seconds
      0 // milliseconds
    ).toISOString();
    return formattedDateString;
  };

  const handleSubmit = (values) => {
    const formattedDate = formattedDateString(values.bookingDateTime);
    createBooking({ date: formattedDate });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex">
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="Pembayaran"
        subtitle="Silahkan Upload Bukti Pembayaran"
      >
        Upload Bukti
      </Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div className="flex justify-between gap-4">
              <label htmlFor="bookingDateTime">Pilih Tanggal dan Waktu</label>
              <Field
                className="border-black border-2 rounded"
                type="datetime-local"
                id="bookingDateTime"
                name="bookingDateTime"
              />
              {errors.bookingDateTime && touched.bookingDateTime && (
                <ErrorMessage name="bookingDateTime" />
              )}
            </div>

            <button
              className="bg-blue-600 px-3 py-2 rounded-lg text-white"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookingForm;
