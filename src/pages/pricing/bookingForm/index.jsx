import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  bookingDateTime: Yup.date().required("Tanggal pemesanan diperlukan"),
  location: Yup.string().required("Alamat diperlukan"),
});

const initialValues = {
  bookingDateTime: "",
  location: "",
};

const BookingForm = ({ onSubmit }) => {
  return (
    <div className="flex min-h-[22rem]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="relative">
            <div className="flex flex-col gap-4">
              <label htmlFor="bookingDateTime">Pilih Tanggal dan Waktu</label>
              <Field name="bookingDateTime">
                {({ field, form }) => (
                  <DateTimePicker
                    {...field}
                    id="bookingDateTime"
                    locale="id-ID"
                    value={field.value ? new Date(field.value) : null}
                    className="border-black border-2 rounded w-[26rem]"
                    format="dd MMMM yyyy HH:mm"
                    placeholder="Pilih tanggal dan waktu"
                    onChange={(value) => form.setFieldValue(field.name, value)}
                  />
                )}
              </Field>
              {errors.bookingDateTime && touched.bookingDateTime && (
                <ErrorMessage name="bookingDateTime" />
              )}

              <label htmlFor="location">Alamat Lengkap Acara</label>
              <Field
                className="border-black border-2 rounded"
                as="textarea"
                id="location"
                name="location"
              />
              {errors.location && touched.location && (
                <ErrorMessage name="location" />
              )}

              <button
                className="bg-blue-600 px-3 py-2 rounded-lg text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

BookingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BookingForm;
