import React, { useState } from "react";
import { Upload, FileText, X, CheckCircle } from "lucide-react";

const FileUpload = ({ handleFileChange, handleUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      setFileName(file.name);
      handleFileChange({ target: { files: [file] } });
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      handleFileChange(e);
    }
  };

  const removeFile = () => {
    setFileName("");
    handleFileChange({ target: { files: [] } });
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${fileName ? "bg-gray-50" : ""}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        <div className="flex flex-col items-center justify-center gap-4">
          {!fileName ? (
            <>
              <div className="p-4 bg-blue-100 rounded-full">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-700">
                  Drag and drop your Excel file here
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse files
                </p>
              </div>
              <p className="text-xs text-gray-400">
                Only .xlsx files are supported
              </p>
            </>
          ) : (
            <div className="flex items-center gap-3 w-full max-w-md">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {fileName}
                </p>
                <p className="text-xs text-gray-500">Ready to upload</p>
              </div>
              <button
                onClick={removeFile}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

      {fileName && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Upload File</span>
        </button>
      )}
    </div>
  );
};

export default FileUpload;
