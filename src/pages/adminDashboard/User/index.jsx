import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Nama User",
    selector: (row) => row.name,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "No Handphone",
    selector: (row) => row.phone,
  },
  {
    name: "Role",
    selector: (row) => row.role,
  },
];

const User = ({ data }) => {
  return (
    <>
      <DataTable columns={columns} data={data} selectableRows pagination />
    </>
  );
};

export default User;
