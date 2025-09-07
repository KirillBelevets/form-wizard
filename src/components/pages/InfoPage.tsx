"use client";

import { Heart, Users, Sparkles } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface InfoPageProps {
  stepData: FormStep;
  onProceed?: () => void;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "hero":
      return <Heart className="w-16 h-16 text-pink-500" />;
    case "stats":
      return <Users className="w-20 h-20 text-white drop-shadow-lg" />;
    case "loading":
      return <Sparkles className="w-16 h-16 text-purple-500 animate-pulse" />;
    default:
      return <Heart className="w-16 h-16 text-pink-500" />;
  }
};

const getTemplateBackground = (template: string) => {
  switch (template) {
    case "hero":
      return "from-pink-500 to-purple-600";
    case "stats":
      return "from-blue-600 to-indigo-700";
    case "loading":
      return "from-purple-500 to-pink-600";
    default:
      return "from-pink-500 to-purple-600";
  }
};

export default function InfoPage({ stepData, onProceed }: InfoPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center space-y-4 sm:space-y-6">
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "hero"
          )} rounded-full flex items-center justify-center shadow-lg`}
        >
          {getTemplateIcon(stepData.template || "hero")}
        </div>

        {stepData.template === "stats" && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-pink-600">
                9.1M+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Active Users
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">
                2.3M+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Successful Matches
              </div>
            </div>
          </div>
        )}
      </div>
    </BasePage>
  );
}
