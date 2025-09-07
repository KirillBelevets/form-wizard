"use client";

import { Check, BookOpen, Car, Users, Trophy } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface GridMultiSelectPageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  onProceed?: () => void;
}

const getTopicIcon = (topic: string) => {
  const lowerTopic = topic.toLowerCase();
  if (lowerTopic.includes("book") || lowerTopic.includes("read")) {
    return <BookOpen className="w-8 h-8 text-blue-500" />;
  }
  if (lowerTopic.includes("car") || lowerTopic.includes("vehicle")) {
    return <Car className="w-8 h-8 text-red-500" />;
  }
  if (lowerTopic.includes("politic") || lowerTopic.includes("government")) {
    return <Users className="w-8 h-8 text-purple-500" />;
  }
  if (lowerTopic.includes("sport") || lowerTopic.includes("fitness")) {
    return <Trophy className="w-8 h-8 text-green-500" />;
  }
  // Default icon
  return <BookOpen className="w-8 h-8 text-gray-700" />;
};

const getTopicColor = (topic: string) => {
  const lowerTopic = topic.toLowerCase();
  if (lowerTopic.includes("book") || lowerTopic.includes("read")) {
    return "text-blue-500 bg-blue-50 border-blue-200";
  }
  if (lowerTopic.includes("car") || lowerTopic.includes("vehicle")) {
    return "text-red-500 bg-red-50 border-red-200";
  }
  if (lowerTopic.includes("politic") || lowerTopic.includes("government")) {
    return "text-purple-500 bg-purple-50 border-purple-200";
  }
  if (lowerTopic.includes("sport") || lowerTopic.includes("fitness")) {
    return "text-green-500 bg-green-50 border-green-200";
  }
  // Default color
  return "text-gray-700 bg-gray-50 border-gray-200";
};

export default function GridMultiSelectPage({
  stepData,
  selectedOptions,
  onOptionSelect,
  onProceed,
}: GridMultiSelectPageProps) {
  const isNoneSelected = selectedOptions.includes("None of the above");

  return (
    <BasePage stepData={stepData}>
      {/* 2x2 Grid of topic options */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {stepData.options
          ?.filter((option) => option !== "None of the above")
          .map((option) => {
            const isSelected = selectedOptions.includes(option);
            const colorClasses = getTopicColor(option);

            return (
              <button
                key={option}
                type="button"
                onClick={() => onOptionSelect(option)}
                disabled={isNoneSelected} // Disable when "None of the above" is selected
                className={`group relative p-4 rounded-xl border-2 text-center transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected
                    ? "border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 shadow-lg"
                    : `border-gray-200 hover:border-pink-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 ${colorClasses}`
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  {/* Icon */}
                  <div className={`p-3 rounded-full ${colorClasses}`}>
                    {getTopicIcon(option)}
                  </div>

                  {/* Topic name */}
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

      {/* None of the above option - simple text link below choices */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            onOptionSelect("None of the above");
            // Auto-proceed when "None of the above" is clicked
            if (onProceed) {
              setTimeout(() => onProceed(), 300);
            }
          }}
          className={`text-base font-medium transition-all duration-200 hover:scale-110 hover:text-lg ${
            isNoneSelected
              ? "text-pink-600"
              : "text-choice-secondary hover:text-pink-500"
          }`}
        >
          None of the above
        </button>
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
