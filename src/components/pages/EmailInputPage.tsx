"use client";

import { Mail } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";

interface EmailInputPageProps {
  stepData: FormStep;
  register: any;
  formErrors?: any;
  validateEmail?: (email: string) => boolean;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "final-step":
      return <Mail className="w-16 h-16 text-blue-500" />;
    default:
      return <Mail className="w-16 h-16 text-blue-500" />;
  }
};

const getTemplateBackground = (template: string) => {
  switch (template) {
    case "final-step":
      return "from-blue-500 to-indigo-600";
    default:
      return "from-blue-500 to-indigo-600";
  }
};

export default function EmailInputPage({
  stepData,
  register,
  formErrors,
  validateEmail,
}: EmailInputPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "final-step"
          )} rounded-full flex items-center justify-center mb-4 sm:mb-6`}
        >
          {getTemplateIcon(stepData.template || "final-step")}
        </div>
      </div>

      <div className="max-w-sm sm:max-w-md mx-auto">
        <input
          type="email"
          {...register(stepData.id)}
          className="w-full p-3 sm:p-4 text-center text-base sm:text-lg text-choice border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder:text-choice-secondary"
          placeholder="your@email.com"
          onChange={(e) => {
            if (validateEmail) {
              validateEmail(e.target.value);
            }
          }}
        />
        {formErrors?.[stepData.id] && (
          <p className="text-red-500 text-xs sm:text-sm mt-2 text-center">
            {formErrors[stepData.id].message as string}
          </p>
        )}
      </div>
    </BasePage>
  );
}
