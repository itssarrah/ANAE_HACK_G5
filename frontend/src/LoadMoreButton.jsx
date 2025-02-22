import React from "react";

const LoadMoreButton = ({ loadMoreRows }) => (
  <button
    onClick={loadMoreRows}
    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
  >
    Load More
  </button>
);

export default LoadMoreButton;
