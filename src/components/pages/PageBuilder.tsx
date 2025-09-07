"use client";

import { FormStep, FormDataRecord } from "@/types";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import InfoPage from "./InfoPage";
import SingleChoicePage from "./SingleChoicePage";
import MultiSelectPage from "./MultiSelectPage";
import CompactMultiSelectPage from "./CompactMultiSelectPage";
import GridMultiSelectPage from "./GridMultiSelectPage";
import TextInputPage from "./TextInputPage";
import EmailInputPage from "./EmailInputPage";
import AgeVerificationPage from "./AgeVerificationPage";
import AnalysisPage from "./AnalysisPage";
import GenderPage from "./GenderPage";

interface PageBuilderProps {
  stepData: FormStep;
  selectedOptions: string[];
  onOptionSelect: (option: string) => void;
  onCompactMultiSelect?: (option: string) => void;
  onProceed?: () => void;
  register: UseFormRegister<FormDataRecord>;
  formErrors?: FieldErrors<FormDataRecord>;
  ageError?: string;
  validateEmail?: (email: string) => boolean;
}

export default function PageBuilder({
  stepData,
  selectedOptions,
  onOptionSelect,
  onCompactMultiSelect,
  onProceed,
  register,
  formErrors,
  ageError,
  validateEmail,
}: PageBuilderProps) {
  switch (stepData.type) {
    case "information":
      return <InfoPage stepData={stepData} onProceed={onProceed} />;

    case "single-choice":
      return (
        <SingleChoicePage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
          formErrors={formErrors}
        />
      );

    case "age-verification":
      return (
        <AgeVerificationPage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
          formErrors={formErrors}
          ageError={ageError}
        />
      );

    case "gender":
      return (
        <GenderPage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
        />
      );

    case "analysis":
      return (
        <AnalysisPage stepData={stepData} onProceed={onProceed || (() => {})} />
      );

    case "multi-select":
      return (
        <MultiSelectPage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
        />
      );

    case "compact-multi-select":
      return (
        <CompactMultiSelectPage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onCompactMultiSelect || onOptionSelect}
          onProceed={onProceed}
        />
      );

    case "grid-multi-select":
      return (
        <GridMultiSelectPage
          stepData={stepData}
          selectedOptions={selectedOptions}
          onOptionSelect={onOptionSelect}
          onProceed={onProceed}
        />
      );

    case "text-input":
      return (
        <TextInputPage
          stepData={stepData}
          register={register}
          formErrors={formErrors}
          inputType="text"
          placeholder="Enter your answer"
        />
      );

    case "email-input":
      return (
        <EmailInputPage
          stepData={stepData}
          register={register}
          formErrors={formErrors}
          validateEmail={validateEmail}
        />
      );

    default:
      return <InfoPage stepData={stepData} />;
  }
}
