export interface SurveyData {
  datetime: string;
  gender: string;
  dating_experience: string;
  goals: string[];
  personality: string[];
  interests: string[];
  topics: string[];
  lifestyle: string;
  hair_color: string;
  age_preference: string;
  age: string;
  location: string;
  traffic_source: string;
  name: string;
  email: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_source?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  type:
    | "single-choice"
    | "multi-select"
    | "compact-multi-select"
    | "grid-multi-select"
    | "text-input"
    | "email-input"
    | "age-verification"
    | "analysis"
    | "gender"
    | "information";
  options?: string[];
  required: boolean;
  validation?: unknown;
  template?: string;
  image?: string;
}

export interface FormState {
  currentStep: number;
  totalSteps: number;
  formData: Partial<SurveyData>;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

export interface FormActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFormData: (data: Partial<SurveyData>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  setError: (field: string, error: string) => void;
  clearErrors: () => void;
  resetForm: () => void;
}
