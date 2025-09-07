"use client";

import { Check, Sparkles, Star, Target } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface MultiSelectPageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "multi-select":
      return <Check className="w-16 h-16 text-indigo-500" />;
    case "personality":
      return <Sparkles className="w-16 h-16 text-yellow-500" />;
    case "interests":
      return <Star className="w-16 h-16 text-orange-500" />;
    default:
      return <Target className="w-16 h-16 text-indigo-500" />;
  }
};

const getTemplateBackground = (template: string) => {
  switch (template) {
    case "multi-select":
      return "from-indigo-500 to-purple-600";
    case "personality":
      return "from-yellow-500 to-orange-600";
    case "interests":
      return "from-orange-500 to-red-600";
    default:
      return "from-indigo-500 to-purple-600";
  }
};

export default function MultiSelectPage({
  stepData,
  selectedOptions,
  onOptionSelect,
}: MultiSelectPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "multi-select"
          )} rounded-full flex items-center justify-center mb-3 sm:mb-4`}
        >
          {getTemplateIcon(stepData.template || "multi-select")}
        </div>
      </div>

      <div className="grid gap-2 sm:gap-3">
        {stepData.options?.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onOptionSelect(option)}
            className={`${
              option === "None of the above" ? "p-3" : "p-3 sm:p-4"
            } rounded-lg sm:rounded-xl border-2 text-left transition-all duration-200 hover:scale-105 ${
              selectedOptions.includes(option)
                ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 shadow-lg"
                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-medium text-sm sm:text-base text-choice group-hover:text-choice-hover transition-all duration-200 ${
                  option === "None of the above" ? "text-xs sm:text-sm" : ""
                }`}
              >
                {option}
              </span>
              {selectedOptions.includes(option) && (
                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === "development" && (
        <div className="text-xs text-gray-400 mt-2 space-y-1">
          <div>
            Debug: Selected {selectedOptions.length} options:{" "}
            {selectedOptions.join(", ")}
          </div>
          <div>
            Step ID: {stepData.id}, Type: {stepData.type}, Template:{" "}
            {stepData.template}
          </div>
          <button
            type="button"
            onClick={() => onOptionSelect("Serious relationship")}
            className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs"
          >
            Test: Add Option
          </button>
        </div>
      )}
    </BasePage>
  );
}
