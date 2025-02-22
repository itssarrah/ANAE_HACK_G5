import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Progress from "./Progress";
import ClusterTable from "./ClusterTable";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [clustersData, setClustersData] = useState({});
  const [clusterTitles, setClusterTitles] = useState({});
  const [expandedClusters, setExpandedClusters] = useState({});
  const [loadMoreClusters, setLoadMoreClusters] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("suggestions");
  const [approvedRows, setApprovedRows] = useState([]);
  const [rejectedRows, setRejectedRows] = useState([]);
  const [aiRejectedRows, setAiRejectedRows] = useState([]);

  const processingSteps = [
    "Upload file",
    "Generate embeddings",
    "Load cleaned embeddings",
    "Filter commercial activities",
    "Filter unmatched activities",
    "Cluster data",
  ];

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsProcessing(true);
    setCurrentStep(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload file
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (
        !data.message?.includes("File uploaded and processed successfully!")
      ) {
        throw new Error(data.message || "Upload failed.");
      }
      setCurrentStep(1);

      // Generate embeddings
      await generateEmbeddings();
      setCurrentStep(2);

      // Load cleaned embeddings
      await loadCleanedEmbeddings();
      setCurrentStep(3);

      // Filter commercial activities
      await filterCommercialActivities();
      setCurrentStep(4);

      // Filter unmatched activities
      await filterUnmatchedActivities();
      setCurrentStep(5);

      // Cluster data
      await cluster();
      setCurrentStep(6);
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Processing failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const generateEmbeddings = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/api/generate_embeddings",
      {
        method: "POST",
      }
    );
    const data = await response.json();
    if (!data.message) throw new Error("Embedding generation failed.");
  };

  const loadCleanedEmbeddings = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/api/load_cleaned_embeddings",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!data.message) throw new Error("Error loading cleaned embeddings.");
  };

  const filterCommercialActivities = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/api/filter_commercial_activities",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!data.message)
      throw new Error("Error filtering commercial activities.");
  };

  const filterUnmatchedActivities = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/api/filter_unmatched_activities",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!data.message) throw new Error("Error filtering unmatched activities.");
  };

  const cluster = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/cluster", {
      method: "GET",
    });
    const data = await response.json();
    if (data.message) {
      setClusterTitles(data.cluster_titles);
      setClustersData(data.cluster_dataframes);
    } else {
      throw new Error("Error clustering activities.");
    }
  };

  const toggleCluster = (clusterId) => {
    setExpandedClusters((prevState) => ({
      ...prevState,
      [clusterId]: !prevState[clusterId],
    }));
  };

  const loadMoreRows = (clusterId) => {
    setLoadMoreClusters((prevState) => ({
      ...prevState,
      [clusterId]: prevState[clusterId] ? prevState[clusterId] + 10 : 10,
    }));
  };

  const handleApproval = (row, clusterId) => {
    setApprovedRows((prev) => [...prev, { ...row, clusterId }]);
    // Remove from clustersData
    setClustersData((prev) => ({
      ...prev,
      [clusterId]: prev[clusterId].filter((r) => r !== row),
    }));
  };

  const handleRejection = (row, clusterId) => {
    setRejectedRows((prev) => [...prev, { ...row, clusterId }]);
    // Remove from clustersData
    setClustersData((prev) => ({
      ...prev,
      [clusterId]: prev[clusterId].filter((r) => r !== row),
    }));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-200 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-extrabold text-blue-600">
            {activeSection === "suggestions"
              ? "Upload an Excel File"
              : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
        </div>

        {activeSection === "suggestions" && (
          <div className="flex flex-col items-center justify-center mb-8 gap-8">
            <FileUpload
              handleFileChange={handleFileChange}
              handleUpload={handleUpload}
            />

            {isProcessing && (
              <Progress
                currentStep={currentStep}
                totalSteps={processingSteps.length}
                steps={processingSteps}
              />
            )}
          </div>
        )}

        <div className="space-y-6">
          {activeSection === "suggestions" &&
            Object.entries(clustersData).map(([clusterId, data]) => (
              <ClusterTable
                key={clusterId}
                clusterId={clusterId}
                clusterTitles={clusterTitles}
                expandedClusters={expandedClusters}
                toggleCluster={toggleCluster}
                loadMoreRows={loadMoreRows}
                loadMoreClusters={loadMoreClusters}
                clustersData={clustersData}
                onApprove={(row) => handleApproval(row, clusterId)}
                onReject={(row) => handleRejection(row, clusterId)}
              />
            ))}

          {activeSection === "approvals" && (
            <div className="space-y-6">
              {approvedRows.map((row, index) => (
                <div
                  key={index}
                  className="w-[80vw] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {row.wilaya}
                      </span>
                    </div>
                    <div className="mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {row.activity}
                      </h3>
                    </div>
                    {row.description && (
                      <p className="text-sm text-gray-600 mb-4">
                        {row.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {row.field}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "rejections" && (
            <div className="space-y-6">
              {rejectedRows.map((row, index) => (
                <div
                  key={index}
                  className="w-[80vw] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {row.wilaya}
                      </span>
                    </div>
                    <div className="mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {row.activity}
                      </h3>
                    </div>
                    {row.description && (
                      <p className="text-sm text-gray-600 mb-4">
                        {row.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {row.field}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
