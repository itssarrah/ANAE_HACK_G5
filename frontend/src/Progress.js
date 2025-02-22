import React from "react";

const Progress = ({ currentStep, totalSteps, steps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">Processing</span>
          <span className="text-sm font-medium text-blue-700">
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            {index < currentStep ? (
              <span className="w-4 h-4 mr-2 text-green-500">✓</span>
            ) : index === currentStep ? (
              <span className="w-4 h-4 mr-2 text-blue-500">●</span>
            ) : (
              <span className="w-4 h-4 mr-2 text-gray-300">○</span>
            )}
            <span
              className={`text-sm ${
                index < currentStep
                  ? "text-green-500"
                  : index === currentStep
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
