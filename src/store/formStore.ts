import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormState, FormActions, SurveyData } from "@/types";

interface FormStore extends FormState, FormActions {}

const initialFormData: Partial<SurveyData> = {
  datetime: "",
  gender: "",
  dating_experience: "",
  goals: [],
  personality: [],
  interests: [],
  topics: [],
  lifestyle: "",
  hair_color: "",
  age_preference: "",
  age: "",
  location: "",
  traffic_source: "",
  name: "",
  email: "",
  utm_campaign: "",
  utm_content: "",
  utm_source: "",
};

export const useFormStore = create<FormStore>()(
  persist(
    (set, get) => ({
      // State
      currentStep: 1,
      totalSteps: 18,
      formData: initialFormData,
      isSubmitting: false,
      errors: {},

      // Actions
      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      goToStep: (step: number) => {
        const { totalSteps } = get();
        if (step >= 1 && step <= totalSteps) {
          set({ currentStep: step });
        }
      },

      updateFormData: (data: Partial<SurveyData>) => {
        set((state) => ({
          formData: { ...state.formData, ...data },
        }));
      },

      setSubmitting: (isSubmitting: boolean) => {
        set({ isSubmitting });
      },

      setError: (field: string, error: string) => {
        set((state) => ({
          errors: { ...state.errors, [field]: error },
        }));
      },

      clearErrors: () => {
        set({ errors: {} });
      },

      resetForm: () => {
        set({
          currentStep: 1,
          formData: initialFormData,
          isSubmitting: false,
          errors: {},
        });
      },
    }),
    {
      name: "form-wizard-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: {
          ...state.formData,
          datetime: "", // Don't persist datetime to avoid hydration issues
        },
      }),
    }
  )
);
