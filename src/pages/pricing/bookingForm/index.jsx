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

const BookingForm = ({ onSubmit }) => {
  return (
    <div className="flex">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
