"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "@/store/formStore";
import { formSteps, formSchema } from "@/lib/formSteps";
import { SurveyData, DynamicFormData, FormDataRecord } from "@/types";
import { updateFormDataWithUTM } from "@/lib/utmMapping";

export function useFormLogic(onSubmit?: (data: SurveyData) => Promise<void>) {
  const {
    currentStep,
    totalSteps,
    formData,
    isSubmitting,
    errors,
    nextStep,
    prevStep,
    updateFormData,
    setSubmitting,
    setError,
    clearErrors,
  } = useFormStore();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [ageError, setAgeError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const currentStepData = formSteps[currentStep - 1] || formSteps[0];

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset,
    setError: setFormError,
    clearErrors: clearFormErrors,
    watch,
  } = useForm<FormDataRecord>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    clearErrors();
    reset(formData);

    // Always reset selectedOptions first
    setSelectedOptions([]);

    // Reset email validation for non-email steps
    if (currentStepData.type !== "email-input") {
      setIsEmailValid(false);
    }

    // Initialize selectedOptions for the current step
    if (
      currentStepData.type === "multi-select" ||
      currentStepData.type === "compact-multi-select" ||
      currentStepData.type === "grid-multi-select" ||
      currentStepData.type === "single-choice" ||
      currentStepData.type === "age-verification" ||
      currentStepData.type === "gender"
    ) {
      const existingData =
        formData[currentStepData.id as keyof typeof formData];
      if (existingData) {
        if (Array.isArray(existingData)) {
          setSelectedOptions(existingData as string[]);
          setValue(
            currentStepData.id as keyof FormDataRecord,
            existingData as string[]
          );
        } else {
          setSelectedOptions([existingData as string]);
          setValue(
            currentStepData.id as keyof FormDataRecord,
            existingData as string
          );
        }
      } else {
        setSelectedOptions([]);
        if (
          currentStepData.type === "multi-select" ||
          currentStepData.type === "compact-multi-select" ||
          currentStepData.type === "grid-multi-select"
        ) {
          setValue(currentStepData.id as keyof FormDataRecord, []);
        }
      }
    }
  }, [
    isMounted,
    currentStep,
    formData,
    currentStepData.id,
    currentStepData.type,
    clearErrors,
    reset,
    setValue,
  ]);

  const handleNext = async (data: DynamicFormData) => {
    try {
      // Special handling for different step types
      if (
        currentStepData.type === "multi-select" ||
        currentStepData.type === "compact-multi-select" ||
        currentStepData.type === "grid-multi-select"
      ) {
        data[currentStepData.id] = selectedOptions;
      } else if (
        currentStepData.type === "single-choice" ||
        currentStepData.type === "age-verification" ||
        currentStepData.type === "gender"
      ) {
        // Use the data passed in if available, otherwise use selectedOptions
        const value = data[currentStepData.id] || selectedOptions[0];
        data[currentStepData.id] = value;
      }

      // Special handling for age verification step - check for under 18
      if (
        currentStepData.type === "age-verification" &&
        (data[currentStepData.id] === "Under 18" ||
          selectedOptions[0] === "Under 18")
      ) {
        setFormError("age", {
          type: "manual",
          message: "Oops! You are not allowed to join if you are under 18",
        });
        return;
      }

      // Update form data with current step data
      const updatedFormData = { ...formData, ...data };
      updateFormData(data);

      if (currentStep === totalSteps) {
        setSubmitting(true);
        // Call the onSubmit function passed from parent component
        if (onSubmit) {
          try {
            await onSubmit(updatedFormData as SurveyData);
          } catch (error) {
            console.error("Form submission error:", error);
            setSubmitting(false);
            throw error; // Re-throw to be handled by the parent
          }
        }
      } else {
        nextStep();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError("general", "Something went wrong. Please try again.");
    }
  };

  const handleOptionSelect = (option: string) => {
    if (
      currentStepData.type === "multi-select" ||
      currentStepData.type === "grid-multi-select"
    ) {
      let newOptions: string[];
      if (option === "None of the above") {
        newOptions = ["None of the above"];
      } else {
        const filtered = selectedOptions.filter(
          (item) => item !== "None of the above"
        );
        newOptions = filtered.includes(option)
          ? filtered.filter((item) => item !== option)
          : [...filtered, option];
      }
      setSelectedOptions(newOptions);
      setValue(currentStepData.id as keyof FormDataRecord, newOptions);
    } else {
      // Handle age verification first
      if (currentStepData.type === "age-verification") {
        if (option === "Under 18") {
          setAgeError("Oops! You are not allowed to join if you are under 18");
          setFormError("age", {
            type: "manual",
            message: "Oops! You are not allowed to join if you are under 18",
          });
          // Don't auto-proceed for Under 18
          return;
        } else {
          // Clear the error for valid age selections
          setAgeError("");
          clearFormErrors("age");
          clearErrors();
        }
      }

      // Update state for all single-choice selections
      setSelectedOptions([option]);
      setValue(currentStepData.id as keyof FormDataRecord, option);

      // Auto-proceed for age verification (valid ages only)
      if (currentStepData.type === "age-verification") {
        setTimeout(() => {
          handleNext({ [currentStepData.id]: option });
        }, 500);
        return;
      }

      // Special handling for traffic source - populate UTM parameters
      if (currentStepData.id === "traffic_source") {
        const updatedData = updateFormDataWithUTM(formData, option);

        // Update the form data with UTM parameters
        updateFormData(updatedData);

        setTimeout(() => {
          handleNext({ [currentStepData.id]: option });
        }, 500);
        return;
      }

      // Auto-proceed for single-choice steps and gender
      if (
        currentStepData.type === "single-choice" ||
        currentStepData.type === "gender"
      ) {
        setTimeout(() => {
          handleNext({ [currentStepData.id]: option });
        }, 500); // Small delay for visual feedback
      }
    }
  };

  const handleCompactMultiSelect = (option: string) => {
    let newOptions: string[];
    if (option === "None of the above") {
      newOptions = ["None of the above"];
    } else {
      const filtered = selectedOptions.filter(
        (item) => item !== "None of the above"
      );
      newOptions = filtered.includes(option)
        ? filtered.filter((item) => item !== option)
        : [...filtered, option];
    }

    setSelectedOptions(newOptions);
    setValue(currentStepData.id as keyof FormDataRecord, newOptions);

    // Auto-proceed only for "None of the above" selection
    if (option === "None of the above") {
      setTimeout(() => {
        handleNext({ [currentStepData.id]: newOptions });
      }, 300); // Shorter delay for compact pages
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email) && email.length > 0;
    setIsEmailValid(isValid);
    return isValid;
  };

  return {
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
    handlePrevious,
    watch,
  };
}
