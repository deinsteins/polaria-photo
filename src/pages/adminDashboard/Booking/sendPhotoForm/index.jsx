/* eslint-disable react/prop-types */
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../../api/api_instance";
import { AxiosError } from "axios";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../../utils/showToast";

const validationSchema = Yup.object().shape({
  linkPhoto: Yup.string().required("Link Wajib Di isi"),
});

const SendPhotoForm = ({ id, setBundle, bundle }) => {
  const authHeader = useAuthHeader();

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.put(
        `/book/${id}`,
        {
          ...values,
        },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      setBundle(!bundle);
      showToast("success", "Berhasil kirim link photo");
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={{ linkPhoto: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="linkPhoto" className="block font-semibold">
              Link Photo
            </label>
            <Field
              type="text"
              id="linkPhoto"
              name="linkPhoto"
              className="w-full border-gray-300 border-2 rounded-md p-2"
            />
            <ErrorMessage
              name="linkPhoto"
              component="div"
              className="text-red-600 mt-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Kirim
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SendPhotoForm;
