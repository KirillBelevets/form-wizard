"use client";

import BasePage from "./BasePage";
import { FormStep } from "@/types";
import { Calendar } from "lucide-react";
import { FaCircle } from "react-icons/fa";

interface AgeVerificationPageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  formErrors?: any;
  ageError?: string;
}

export default function AgeVerificationPage({
  stepData,
  selectedOptions,
  onOptionSelect,
  formErrors,
  ageError,
}: AgeVerificationPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-3 sm:mb-4">
          <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-responsive-xl">
          {stepData.title}
        </h2>
        {stepData.description && (
          <p className="text-gray-700 mt-2 text-sm sm:text-base text-responsive-base">
            {stepData.description}
          </p>
        )}
        {/* Show error for age verification */}
        {ageError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-medium">{ageError}</p>
          </div>
        )}
      </div>

      {/* Card-based options for age verification - same as single-choice */}
      <div className="space-y-3 max-w-md mx-auto">
        {stepData.options?.map((option) => {
          const isSelected = selectedOptions.includes(option);
          const isUnder18 = option === "Under 18";

          return (
            <button
              key={option}
              type="button"
              onClick={() => onOptionSelect(option)}
              className={`group w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? isUnder18
                    ? "border-red-500 bg-red-50 shadow-md"
                    : "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25"
              }`}
            >
              {/* Left side - Icon */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaCircle
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isSelected
                        ? isUnder18
                          ? "text-red-600"
                          : "text-purple-600"
                        : "text-gray-600 group-hover:text-purple-500"
                    }`}
                  />
                </div>
                <span
                  className={`text-base font-medium transition-all duration-200 ${
                    isSelected
                      ? isUnder18
                        ? "text-red-800"
                        : "text-choice-selected"
                      : "text-choice group-hover:text-choice-hover"
                  }`}
                >
                  {option}
                </span>
              </div>

              {/* Right side - Radio button */}
              <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                {isSelected && (
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isUnder18 ? "bg-red-500" : "bg-purple-500"
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-400 mt-4 space-y-1 text-center">
          <div>
            Debug: Selected {selectedOptions.length} options:{" "}
            {selectedOptions.join(", ")}
          </div>
          <div>
            Step ID: {stepData.id}, Type: {stepData.type}, Template:{" "}
            {stepData.template}
          </div>
        </div>
      )}
    </BasePage>
  );
}
