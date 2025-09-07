"use client";

import BasePage from "./BasePage";
import { FormStep } from "@/types";
import { Check } from "lucide-react";
import { FaMars, FaVenus } from "react-icons/fa";

interface GenderPageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
}

export default function GenderPage({
  stepData,
  selectedOptions,
  onOptionSelect,
}: GenderPageProps) {
  return (
    <BasePage stepData={stepData}>
      {/* Gender selection with man and woman icons */}
      <div className="flex justify-center gap-8 sm:gap-12">
        {stepData.options?.map((option) => {
          const isSelected = selectedOptions.includes(option);
          const isMale = option === "Man";

          return (
            <button
              key={option}
              type="button"
              onClick={() => onOptionSelect(option)}
              className="group relative flex flex-col items-center space-y-4 transition-all duration-300 hover:scale-110"
            >
              {/* Circle background with gender-specific colors */}
              <div
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 transition-all duration-300 ${
                  isSelected
                    ? isMale
                      ? "border-blue-500 bg-gradient-to-br from-blue-100 to-indigo-100 shadow-lg"
                      : "border-pink-500 bg-gradient-to-br from-pink-100 to-purple-100 shadow-lg"
                    : isMale
                    ? "border-blue-200 bg-white group-hover:border-blue-300 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50"
                    : "border-pink-200 bg-white group-hover:border-pink-300 group-hover:bg-gradient-to-br group-hover:from-pink-50 group-hover:to-purple-50"
                }`}
              >
                {/* Gender icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isMale ? (
                    <FaMars
                      className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${
                        isSelected
                          ? "text-blue-600"
                          : "text-blue-400 group-hover:text-blue-500"
                      }`}
                    />
                  ) : (
                    <FaVenus
                      className={`w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 ${
                        isSelected
                          ? "text-pink-600"
                          : "text-pink-400 group-hover:text-pink-500"
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Option text */}
              <span
                className={`text-base sm:text-lg font-medium transition-all duration-300 ${
                  isSelected
                    ? isMale
                      ? "text-blue-800"
                      : "text-pink-800"
                    : isMale
                    ? "text-blue-700 group-hover:text-blue-800"
                    : "text-pink-700 group-hover:text-pink-800"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-600 mt-4 space-y-1 text-center">
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
