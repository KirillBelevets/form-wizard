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
  name?: string;
  email: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_source?: string;
}

// Form data type for React Hook Form
export type FormData = Partial<SurveyData>;

// Field errors type for React Hook Form
export type FormFieldErrors = {
  [K in keyof SurveyData]?: {
    message?: string;
    type?: string;
  };
};

// Dynamic form data type for form handling
export type DynamicFormData = {
  [key: string]: string | string[] | undefined;
};

// Precise form data type based on our actual form fields
export type FormDataRecord = {
  datetime?: string;
  gender?: string;
  dating_experience?: string;
  goals?: string[];
  personality?: string[];
  interests?: string[];
  topics?: string[];
  lifestyle?: string;
  hair_color?: string;
  age_preference?: string;
  age?: string;
  location?: string;
  traffic_source?: string;
  name?: string;
  email?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_source?: string;
};

// Form error type for specific field access
export type FormError = {
  message?: string;
  type?: string;
};

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
