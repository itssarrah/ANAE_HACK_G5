import React from "react";

const Preview = ({ preview }) => (
  <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl">
    <h2 className="text-2xl font-semibold mb-4">File Preview</h2>
    <table className="min-w-full bg-gray-50 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-blue-100">
          {Object.keys(preview[0] || {}).map((key, idx) => (
            <th key={idx} className="px-4 py-2 border text-left">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {preview.map((row, index) => (
          <tr key={index} className="hover:bg-gray-200 transition duration-300">
            {Object.values(row).map((value, idx) => (
              <td key={idx} className="px-4 py-2 border">
                {value || "N/A"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Preview;
