import React from "react";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";

const ClusterTable = ({
  clusterId,
  clusterTitles,
  expandedClusters,
  toggleCluster,
  loadMoreRows,
  loadMoreClusters,
  clustersData,
  onApprove,
  onReject,
}) => {
  const isExpanded = expandedClusters[clusterId];
  const loadMore = loadMoreClusters[clusterId] || 5;
  const data = clustersData[clusterId];

  const cleanTitle = (title) => {
    return title ? title.replace(/\*/g, "") : `Cluster ${clusterId}`;
  };

  const Chip = ({ children, color = "blue" }) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`${colorClasses[color]} text-xs font-medium px-2.5 py-0.5 rounded-full`}
      >
        {children}
      </span>
    );
  };

  const ActionButton = ({ isAccept, onClick }) => {
    const baseStyles =
      "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm";
    const acceptStyles =
      "bg-green-100 text-green-700 hover:bg-green-200 active:bg-green-300";
    const rejectStyles =
      "bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300";

    return (
      <button
        className={`${baseStyles} ${isAccept ? acceptStyles : rejectStyles}`}
        onClick={onClick}
      >
        {isAccept ? (
          <>
            <Check className="w-4 h-4" />
            Accept
          </>
        ) : (
          <>
            <X className="w-4 h-4" />
            Reject
          </>
        )}
      </button>
    );
  };

  return (
    <div className="w-[80vw] bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={() => toggleCluster(clusterId)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          {cleanTitle(clusterTitles[clusterId])}
        </h2>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {isExpanded && (
        <div className="divide-y divide-gray-200">
          {data.slice(0, loadMore).map((row, index) => (
            <div key={index} className="p-6">
              <div className="mb-4">
                <Chip>{row.wilaya}</Chip>
              </div>

              <div className="mb-2">
                <h3 className="text-lg font-medium text-gray-900">
                  {row.activity}
                </h3>
              </div>

              {row.description && (
                <p className="text-sm text-gray-600 mb-4">{row.description}</p>
              )}

              <div className="flex items-center justify-between">
                <Chip color="purple">{row.field}</Chip>
                <div className="flex gap-3">
                  <ActionButton
                    isAccept={true}
                    onClick={() => onApprove && onApprove(row)}
                  />
                  <ActionButton
                    isAccept={false}
                    onClick={() => onReject && onReject(row)}
                  />
                </div>
              </div>
            </div>
          ))}

          {data.length > loadMore && (
            <button
              onClick={() => loadMoreRows(clusterId)}
              className="w-full py-3 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
            >
              Load more entries
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClusterTable;
