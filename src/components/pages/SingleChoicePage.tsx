"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Check,
  Clock,
  Heart,
  MapPin,
  Palette,
  Target,
  User,
} from "lucide-react";
import { FaCircle } from "react-icons/fa";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface SingleChoicePageProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  formErrors?: any;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "choice-card":
      return <User className="w-16 h-16 text-purple-500" />;
    case "question":
      return <Target className="w-16 h-16 text-green-500" />;
    case "lifestyle":
      return <Clock className="w-16 h-16 text-teal-500" />;
    case "appearance":
      return <Palette className="w-16 h-16 text-pink-500" />;
    case "preference":
      return <Heart className="w-16 h-16 text-red-500" />;
    case "age-verification":
      return <Calendar className="w-16 h-16 text-blue-500" />;
    case "location":
      return <MapPin className="w-16 h-16 text-green-500" />;
    default:
      return <Target className="w-16 h-16 text-green-500" />;
  }
};

const getTemplateBackground = (template: string) => {
  switch (template) {
    case "choice-card":
      return "from-purple-500 to-pink-600";
    case "question":
      return "from-green-500 to-emerald-600";
    case "lifestyle":
      return "from-teal-500 to-cyan-600";
    case "appearance":
      return "from-pink-500 to-rose-600";
    case "preference":
      return "from-red-500 to-pink-600";
    case "age-verification":
      return "from-blue-500 to-indigo-600";
    case "location":
      return "from-green-500 to-teal-600";
    default:
      return "from-green-500 to-emerald-600";
  }
};

export default function SingleChoicePage({
  stepData,
  selectedOptions,
  onOptionSelect,
  formErrors,
}: SingleChoicePageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "question"
          )} rounded-full flex items-center justify-center mb-4 sm:mb-6`}
        >
          {getTemplateIcon(stepData.template || "question")}
        </div>

        {/* Show error for age verification */}
        {stepData.id === "age" && formErrors?.age && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">
              {formErrors.age?.message || "Invalid age"}
            </p>
          </div>
        )}
      </div>

      {/* Card-based options for single-choice pages */}
      <div className="space-y-3 max-w-md mx-auto">
        {stepData.options?.map((option, index) => {
          const isSelected = selectedOptions.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onOptionSelect(option)}
              className={`group w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "border-purple-500 bg-purple-50 shadow-md"
                  : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25"
              }`}
            >
              {/* Left side - Icon */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <FaCircle
                    className={`w-6 h-6 transition-colors duration-200 ${
                      isSelected
                        ? "text-purple-600"
                        : "text-gray-600 group-hover:text-purple-500"
                    }`}
                  />
                </div>
                <span
                  className={`text-base font-medium transition-all duration-200 ${
                    isSelected
                      ? "text-choice-selected"
                      : "text-choice group-hover:text-choice-hover"
                  }`}
                >
                  {option}
                </span>
              </div>

              {/* Right side - Radio button */}
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-purple-500 bg-purple-500"
                    : "border-gray-300 group-hover:border-purple-400"
                }`}
              >
                {isSelected && (
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                )}
              </div>
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
