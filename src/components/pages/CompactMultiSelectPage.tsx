"use client";

import { Check, Sparkles, Star, Target } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface CompactMultiSelectPageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  onProceed?: () => void;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "compact-multi":
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
    case "compact-multi":
      return "from-indigo-500 to-purple-600";
    case "personality":
      return "from-yellow-500 to-orange-600";
    case "interests":
      return "from-orange-500 to-red-600";
    default:
      return "from-indigo-500 to-purple-600";
  }
};

export default function CompactMultiSelectPage({
  stepData,
  selectedOptions,
  onOptionSelect,
  onProceed,
}: CompactMultiSelectPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "compact-multi"
          )} rounded-full flex items-center justify-center mb-3 sm:mb-4`}
        >
          {getTemplateIcon(stepData.template || "compact-multi")}
        </div>
      </div>

      {/* Compact grid layout - only regular options */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
        {stepData.options
          ?.filter((option) => option !== "None of the above")
          .map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <button
                key={option}
                type="button"
                onClick={() => onOptionSelect(option)}
                className={`group relative p-3 sm:p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-choice group-hover:text-choice-hover transition-all duration-200">
                    {option}
                  </span>

                  {/* Square checkbox */}
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      isSelected
                        ? "border-pink-500 bg-pink-500"
                        : "border-gray-300 group-hover:border-pink-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
      </div>

      {/* None of the above - simple text link */}
      {stepData.options?.some((option) => option === "None of the above") && (
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => {
              const noneOption = stepData.options?.find(
                (option) => option === "None of the above"
              );
              if (noneOption) {
                onOptionSelect(noneOption);
                if (onProceed) {
                  onProceed();
                }
              }
            }}
            className="text-choice-secondary hover:text-pink-600 text-sm font-medium hover:text-base transition-all duration-200"
          >
            None of the above
          </button>
        </div>
      )}

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
