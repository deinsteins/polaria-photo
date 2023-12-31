import { Formik, Field, FieldArray, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../../api/api_instance";
import { AxiosError } from "axios";
import { useAuthHeader } from "react-auth-kit";
import showToast from "../../../../utils/showToast";
import PropTypes from "prop-types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nama Paket wajib diisi"),
  price: Yup.number().required("Harga wajib diisi"),
  details: Yup.array().of(Yup.string()).required("Detail Paket wajib diisi"),
});

const AddBundleForm = ({ setBundle, bundle }) => {
  const authHeader = useAuthHeader();

  const initialValues = {
    name: "",
    price: "",
    details: [],
  };
  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post(
        `/products`,
        { ...values },
        {
          headers: {
            Authorization: authHeader(),
          },
        }
      );
      setBundle(!bundle);
      showToast("success", "Paket Berhasil ditambahkan");
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold">
              Nama Paket
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full border-gray-300 border-2 rounded-md p-2"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-600 mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block font-semibold">
              Harga
            </label>
            <Field
              type="number"
              id="price"
              name="price"
              className="w-full border-gray-300 rounded-md border-2 p-2"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-600 mt-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="details" className="block font-semibold">
              Detail Paket
            </label>
            <FieldArray name="details">
              {({ push, remove, form }) => (
                <div>
                  {form.values.details.map((_, index) => (
                    <div key={index} className="flex mb-2">
                      <Field
                        name={`details[${index}]`}
                        className="w-full border-gray-300 border-2 rounded-md p-2"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="ml-2 bg-red-500 text-white rounded-md px-3 py-1"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="bg-blue-500 text-white rounded-md px-3 py-1"
                  >
                    Tambah Detail
                  </button>
                </div>
              )}
            </FieldArray>
            <ErrorMessage
              name="details"
              component="div"
              className="text-red-600 mt-2"
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white rounded-md px-4 py-2"
          >
            Simpan
          </button>
        </Form>
      </Formik>
    </div>
  );
};

AddBundleForm.propTypes = {
  setBundle: PropTypes.func.isRequired,
  bundle: PropTypes.bool.isRequired,
};

export default AddBundleForm;
