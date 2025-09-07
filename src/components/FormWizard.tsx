"use client";

import { ChevronRight } from "lucide-react";
import { useFormLogic } from "@/hooks/useFormLogic";
import PageBuilder from "./pages/PageBuilder";
import { SurveyData, FormData } from "@/types";

interface FormWizardProps {
  onSubmit: (data: SurveyData) => Promise<void>;
}

export default function FormWizard({ onSubmit }: FormWizardProps) {
  const {
    currentStep,
    totalSteps,
    currentStepData,
    selectedOptions,
    formErrors,
    errors,
    isSubmitting,
    isMounted,
    ageError,
    isEmailValid,
    validateEmail,
    register,
    handleSubmit,
    handleNext,
    handleOptionSelect,
    handleCompactMultiSelect,
    watch,
  } = useFormLogic(onSubmit);

  // Show loading while not mounted or submitting
  if (!isMounted || isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isSubmitting ? "Submitting your responses..." : "Loading..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-2xl animate-fade-in-up">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-semibold">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 sm:h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-12">
          <form
            onSubmit={handleSubmit(handleNext)}
            className="space-y-6 sm:space-y-8"
          >
            <PageBuilder
              stepData={currentStepData}
              selectedOptions={selectedOptions}
              onOptionSelect={handleOptionSelect}
              onCompactMultiSelect={handleCompactMultiSelect}
              onProceed={() => handleNext({})}
              register={register}
              formErrors={formErrors}
              ageError={ageError}
              validateEmail={validateEmail}
            />

            {/* Error Display */}
            {"general" in errors && errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
                <p className="text-red-600 text-center text-sm sm:text-base">
                  {errors.general}
                </p>
              </div>
            )}

            {/* Continue Button - appears when user makes selections */}
            {(() => {
              // Pages that need Continue button when user makes selections
              const needsContinueButton =
                currentStepData.type === "multi-select" ||
                currentStepData.type === "compact-multi-select" ||
                currentStepData.type === "grid-multi-select" ||
                currentStepData.type === "text-input" ||
                currentStepData.type === "email-input";

              // Pages that always show Continue button (info pages)
              const needsInfoContinueButton =
                currentStepData.type === "information";

              // Pages that auto-proceed and should never show Continue button
              const isAutoProceedPage =
                currentStepData.type === "single-choice" ||
                currentStepData.type === "age-verification" ||
                currentStepData.type === "gender" ||
                currentStepData.type === "analysis";

              const hasSelection = selectedOptions.length > 0;
              const isEmailStep = currentStepData.type === "email-input";
              const isTextInputStep = currentStepData.type === "text-input";

              // Watch the current field value for text input
              const currentFieldValue = watch(
                currentStepData.id as keyof FormData
              );

              // Check if text input has content
              const hasTextInput =
                isTextInputStep &&
                currentFieldValue &&
                String(currentFieldValue).trim().length > 0;

              // Don't show button for auto-proceed pages
              if (isAutoProceedPage) return null;

              // Show button if page needs it AND user has made a selection, OR if it's an info page
              // For email steps, also check if email is valid
              // For text input steps, check if there's text content
              const shouldShowButton =
                (needsContinueButton && (hasSelection || hasTextInput)) ||
                needsInfoContinueButton ||
                (isEmailStep && isEmailValid);

              if (!shouldShowButton) return null;

              return (
                <div className="flex justify-center pt-4 sm:pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center space-x-2 px-8 sm:px-12 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 focus-ring"
                  >
                    <span className="text-sm sm:text-base font-medium">
                      {currentStep === totalSteps ? "Complete" : "Continue"}
                    </span>
                    {currentStep < totalSteps && (
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              );
            })()}
          </form>
        </div>
      </div>
    </div>
  );
}
