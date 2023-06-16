import DataTable from "react-data-table-component";
import { Navigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

const columns = [
  {
    name: "Tanggal Booking",
    selector: (row) => formatDate(row.bookingDate),
  },
  {
    name: "Bukti Pembayaran",
    cell: (row) => (
      <a
        href={row.proofOfPayment}
        target="blank"
        className="px-2 py-1 text-center bg-indigo-600 text-white rounded-lg"
      >
        Lihat Bukti
      </a>
    ),
    button: true,
  },
  {
    name: "Status Pembayaran",
    selector: (row) => row.paymentStatus,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "ID Product",
    selector: (row) => row.productId,
  },
  {
    name: "ID User",
    selector: (row) => row.userId,
  },
  {
    name: "Konfirmasi Pembayaran",
    cell: (row) => (
      <button
        href={row.proofOfPayment}
        target="blank"
        className="px-2 py-1 bg-green-600 text-white rounded-lg"
      >
        Konfirmasi
      </button>
    ),
    button: true,
  },
];

const Booking = ({ data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} selectableRows pagination />
    </>
  );
};

export default Booking;
