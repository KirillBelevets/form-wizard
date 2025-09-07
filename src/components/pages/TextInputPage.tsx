"use client";

import { User } from "lucide-react";
import BasePage from "./BasePage";
import { FormStep, FormDataRecord } from "@/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface TextInputPageProps {
  stepData: FormStep;
  register: UseFormRegister<FormDataRecord>;
  formErrors?: FieldErrors<FormDataRecord>;
  inputType?: "text";
  placeholder?: string;
}

const getTemplateIcon = (template: string) => {
  switch (template) {
    case "personal-info":
      return <User className="w-16 h-16 text-indigo-500" />;
    default:
      return <User className="w-16 h-16 text-indigo-500" />;
  }
};

const getTemplateBackground = (template: string) => {
  switch (template) {
    case "personal-info":
      return "from-indigo-500 to-blue-600";
    default:
      return "from-indigo-500 to-blue-600";
  }
};

export default function TextInputPage({
  stepData,
  register,
  formErrors,
  inputType = "text",
  placeholder,
}: TextInputPageProps) {
  return (
    <BasePage stepData={stepData}>
      <div className="text-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br ${getTemplateBackground(
            stepData.template || "personal-info"
          )} rounded-full flex items-center justify-center mb-3 sm:mb-4`}
        >
          {getTemplateIcon(stepData.template || "personal-info")}
        </div>
      </div>

      <div className="max-w-sm sm:max-w-md mx-auto">
        <input
          type={inputType}
          {...register(stepData.id as keyof FormDataRecord)}
          className="w-full p-3 sm:p-4 text-center text-base sm:text-lg text-choice border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 placeholder:text-choice-secondary"
          placeholder={placeholder}
        />
        {formErrors?.[stepData.id as keyof FormDataRecord] && (
          <p className="text-red-500 text-xs sm:text-sm mt-2 text-center">
            {formErrors[stepData.id as keyof FormDataRecord]?.message as string}
          </p>
        )}
      </div>
    </BasePage>
  );
}
