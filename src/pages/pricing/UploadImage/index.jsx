import { Formik, Form, ErrorMessage } from "formik";
import PropTypes from "prop-types";
import Loader from "../../../components/loader";
import PaymentCard from "./paymentCard";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   image: Yup.mixed().required("Gambar harus diunggah"),
// });

const UploadImageForm = ({ onUpload, onChange, isLoading }) => {
  const initialValues = {
    image: null,
  };

  return (
    <div>
      {isLoading ? (
        <Loader text="Mengupload Gambar" />
      ) : (
        <div className="flex flex-col gap-4">
          <PaymentCard />
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onUpload}
          >
            <Form className="max-w-lg mx-auto" encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2 font-bold">
                  Unggah Bukti Pembayaran
                </label>
                <input
                  id="proofOfPayment"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="border-gray-300 rounded-md py-2 w-full"
                  onChange={onChange}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Unggah
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

UploadImageForm.propTypes = {
  onUpload: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UploadImageForm;
