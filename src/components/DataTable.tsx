import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// Example data fetch
const fetchData = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users");
  return res.data;
};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

function DataTable() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchData,
  });

  // Search/filter state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const pageSize = 5;

  // Filtered data
  const filtered = data.filter(
    (row: any) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase())
  );
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const table = useReactTable({
    data: paged,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(0);
          }}
          className="border rounded px-2 py-1 w-full sm:w-64"
        />
        <button
          className="border px-2 py-1 rounded bg-blue-500 text-white"
          onClick={() => {
            const csv = ["ID,Name,Email", ...filtered.map((r: any) => `${r.id},${r.name},${r.email}`)].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "users.csv";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export CSV
        </button>
      </div>
      <table className="min-w-full border border-gray-200 rounded text-sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-2 py-2 border-b bg-gray-50 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-2 py-2 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext()) ?? String(cell.getValue())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-2">
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.max(1, Math.ceil(filtered.length / pageSize))}
        </span>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => p + 1)}
          disabled={(page + 1) * pageSize >= filtered.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}


export default DataTable;
