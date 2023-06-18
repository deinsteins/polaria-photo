import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "../../../api/api_instance";
import showToast from "../../../utils/showToast";
import { useAuthHeader } from "react-auth-kit";
import Modal from "../../../components/modal";
import EditBundleForm from "./editBundleForm";
import AddBundleForm from "./addBundleForm";

const Bundle = () => {
  const [bundleData, setBundleData] = useState("");
  const [bundle, setBundle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [addBundleModalOpen, setAddBundleModalOpen] = useState(false);
  const [bundleId, setBundleId] = useState("");

  const authHeader = useAuthHeader();

  const columns = [
    {
      name: "Nama Paket",
      selector: (row) => row.name,
    },
    {
      name: "Harga",
      selector: (row) => row.price,
    },
    {
      name: "Detail Paket",
      selector: (row) => row.details,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <div className="flex gap-2">
            <button
              className="px-2 py-1 bg-orange-600 text-white rounded-lg"
              onClick={async () => {
                handleOpenModal();
                setBundleId(row.id);
              }}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-600 text-white rounded-lg"
              onClick={async () => {
                await axiosInstance.delete(`/products/${row.id}`, {
                  headers: {
                    Authorization: authHeader(),
                  },
                });
                setBundle(!bundle);
                showToast("success", "Berhasil menghapus paket");
              }}
            >
              Hapus
            </button>
          </div>
        </>
      ),
      button: true,
    },
  ];

  const getBundleData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setBundleData(response.data);
    } catch (error) {
      if (error && error instanceof AxiosError) {
        error.response.data.error;
      } else if (error && error instanceof Error) error.message;
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseAddBundleModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getBundleData();
  }, []);

  useEffect(() => {
    getBundleData();
  }, [bundle]);

  return (
    <div className="flex flex-col gap-4">
      <Modal
        isOpen={addBundleModalOpen}
        onClose={handleCloseAddBundleModal}
        title="Edit Paket"
        subtitle="Silahkan Isi Data Paket"
      >
        <AddBundleForm setBundle={setBundle} bundle={bundle} />
      </Modal>
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title="Edit Paket"
        subtitle="Silahkan Isi Data Paket"
      >
        <EditBundleForm id={bundleId} setBundle={setBundle} bundle={bundle} />
      </Modal>
      <button
        className="px-4 py-2 bg-blue-600 w-3/12 rounded-lg text-white"
        onClick={() => setAddBundleModalOpen(true)}
      >
        Tambah Paket
      </button>
      <DataTable
        columns={columns}
        data={bundleData}
        selectableRows
        pagination
      />
    </div>
  );
};

export default Bundle;
