import { useCallback, useMemo, useState } from "react";
import DataTable from "react-data-table-component";

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
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-orange-600 text-white rounded-lg">
          Edit
        </button>
        <button className="px-2 py-1 bg-red-600 text-white rounded-lg">
          Hapus
        </button>
      </div>
    ),
    button: true,
  },
];

const Bundle = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [bundleData, setBundleData] = useState(data);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.title
          )}?`
        )
      ) {
        console.log("djnndj");
        setToggleCleared(!toggleCleared);
        setBundleData((bundleData, selectedRows, "title"));
      }
    };

    return (
      <button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        icon
      >
        Delete
      </button>
    );
  }, [bundleData, selectedRows, toggleCleared]);

  return (
    <div className="flex flex-col gap-4">
      <button className="px-4 py-2 bg-blue-600 w-3/12 rounded-lg text-white">
        Tambah Paket
      </button>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        pagination
      />
    </div>
  );
};

export default Bundle;
