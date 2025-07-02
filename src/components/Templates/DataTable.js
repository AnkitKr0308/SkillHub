import React from "react";

function DataTable({ columns = [], data = [], readOnly, onEdit, onDelete }) {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th scope="col" className="px-6 py-3" key={column.id}>
                  {column.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                className="text-white bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                key={index}
              >
                {columns.map((col) => (
                  <td key={col.id} className="px-6 py-4" readOnly={readOnly}>
                    {row[col.id]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className="flex gap-6">
                    <button title="Edit" onClick={() => onEdit?.(row)}>
                      🖉
                    </button>
                    <button title="Delete" onClick={() => onDelete?.(row)}>
                      &#10060;
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
