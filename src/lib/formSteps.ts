import { z } from "zod";
import { FormStep } from "@/types";

// Validation schemas for each step
export const stepSchemas = {
  gender: z.object({
    gender: z.string().min(1, "Please select your gender"),
  }),
  dating_experience: z.object({
    dating_experience: z.string().min(1, "Please select an option"),
  }),
  goals: z.object({
    goals: z.array(z.string()).min(1, "Please select at least one option"),
  }),
  personality: z.object({
    personality: z.array(z.string()).min(1, "Please select at least one trait"),
  }),
  interests: z.object({
    interests: z
      .array(z.string())
      .min(1, "Please select at least one interest"),
  }),
  lifestyle: z.object({
    lifestyle: z.string().min(1, "Please select a lifestyle option"),
  }),
  hair_color: z.object({
    hair_color: z.string().min(1, "Please select a hair color"),
  }),
  age_preference: z.object({
    age_preference: z.string().min(1, "Please select an age preference"),
  }),
  age: z.object({
    age: z.string().min(1, "Please select your age range"),
  }),
  location: z.object({
    location: z.string().min(1, "Please select your location"),
  }),
  name: z.object({
    name: z.string().min(1, "Please enter your name"),
  }),
  email: z.object({
    email: z.string().email("Please enter a valid email address"),
  }),
};

// Form steps configuration with 15+ different page templates
export const formSteps: FormStep[] = [
  {
    id: "welcome",
    title: "Welcome to SoulMatch",
    description: "Find your perfect match in just a few minutes",
    type: "information",
    required: false,
    image: "/images/welcome-hero.jpg",
    template: "hero",
  },
  {
    id: "gender",
    title: "THE joy of connection ON SoulMatch",
    description: "Based on your experience",
    type: "gender",
    options: ["Man", "Woman"],
    required: true,
    template: "choice-card",
  },
  {
    id: "stats",
    title: "Over 9,108,000 people have already chosen our platform",
    description: "Join thousands of successful matches every day",
    type: "information",
    required: false,
    template: "stats",
    image: "/images/success-stories.jpg",
  },
  {
    id: "dating_experience",
    title: "Have you ever tried online dating before?",
    description: "This helps us personalize your experience",
    type: "single-choice",
    options: [
      "Yes, I have experience",
      "No, this is my first time",
      "I've tried but had no luck",
    ],
    required: true,
    template: "question",
  },
  {
    id: "goals",
    title: "What are you looking for?",
    description: "Select all that apply to you",
    type: "compact-multi-select",
    options: [
      "Serious relationship",
      "Casual dating",
      "Friendship",
      "Marriage",
      "Just exploring",
      "None of the above",
    ],
    required: true,
    template: "compact-multi",
  },
  {
    id: "personality",
    title: "How would you describe yourself?",
    description: "Choose the traits that best represent you",
    type: "compact-multi-select",
    options: [
      "Adventurous",
      "Romantic",
      "Funny",
      "Intellectual",
      "Creative",
      "Athletic",
      "Caring",
      "Ambitious",
    ],
    required: true,
    template: "personality",
  },
  {
    id: "interests",
    title: "What are your main interests?",
    description: "This helps us find people with similar hobbies",
    type: "compact-multi-select",
    options: [
      "Music & Concerts",
      "Sports & Fitness",
      "Travel & Adventure",
      "Art & Culture",
      "Technology",
      "Cooking & Food",
      "Books & Reading",
      "Movies & TV Shows",
    ],
    required: true,
    template: "interests",
  },
  {
    id: "topics",
    title: "What topics would you love to discuss?",
    description: "Select the topics that interest you most",
    type: "grid-multi-select",
    options: ["Books", "Cars", "Politics", "Sports", "None of the above"],
    required: true,
    template: "topics",
  },
  {
    id: "lifestyle",
    title: "Tell us about your lifestyle",
    description: "How do you like to spend your free time?",
    type: "single-choice",
    options: [
      "I love going out and socializing",
      "I prefer quiet evenings at home",
      "I'm always up for new adventures",
      "I enjoy a mix of both",
    ],
    required: true,
    template: "lifestyle",
  },
  {
    id: "hair_color",
    title: "What's your hair color?",
    description: "Help others recognize you",
    type: "single-choice",
    options: ["Black", "Brown", "Blonde", "Red", "Gray", "Other"],
    required: true,
    template: "appearance",
  },
  {
    id: "age_preference",
    title: "What age range interests you?",
    description: "This helps us show you relevant matches",
    type: "single-choice",
    options: [
      "Same age as me",
      "A few years younger",
      "A few years older",
      "Much younger",
      "Much older",
      "Age doesn't matter",
    ],
    required: true,
    template: "preference",
  },
  {
    id: "age",
    title: "How old are you?",
    description:
      "By clicking the button below, you approve that you are at least 18 or adult age in your country.",
    type: "age-verification",
    options: [
      "Under 18",
      "Age 18-34",
      "Age 35-44",
      "Age 45-54",
      "Age 55-64",
      "Age 65+",
    ],
    required: true,
    template: "age-verification",
  },
  {
    id: "location",
    title: "Where are you located?",
    description: "We'll help you find matches nearby",
    type: "single-choice",
    options: [
      "North America",
      "Europe",
      "Asia",
      "South America",
      "Africa",
      "Australia",
      "Other",
    ],
    required: true,
    template: "location",
  },
  {
    id: "traffic_source",
    title: "Where did you find SoulMatch?",
    description: "This helps us understand how people discover our platform",
    type: "single-choice",
    options: [
      "Google Search",
      "Facebook",
      "Instagram",
      "TikTok",
      "YouTube",
      "Twitter/X",
      "LinkedIn",
      "Email Newsletter",
      "Friend Referral",
      "Other Website",
      "Direct Visit",
    ],
    required: true,
    template: "traffic-source",
  },
  {
    id: "analyzing",
    title: "Finding your perfect matches...",
    description:
      "Our AI is analyzing your preferences to find the best connections",
    type: "analysis",
    required: false,
    template: "loading",
    image: "/images/analyzing.jpg",
  },
  {
    id: "name",
    title: "What should we call you?",
    description: "This is how others will see you on the platform",
    type: "text-input",
    required: true,
    template: "personal-info",
  },
  {
    id: "email",
    title: "Almost done! Just need your email",
    description:
      "We'll send you a verification link to complete your registration",
    type: "email-input",
    required: true,
    template: "final-step",
  },
  {
    id: "success",
    title: "Welcome to SoulMatch!",
    description:
      "Your profile is being created. Check your email for verification.",
    type: "information",
    required: false,
    template: "success",
    image: "/images/success.jpg",
  },
];

export const getStepSchema = (stepId: string) => {
  switch (stepId) {
    case "gender":
      return stepSchemas.gender;
    case "dating_experience":
      return stepSchemas.dating_experience;
    case "goals":
      return stepSchemas.goals;
    case "personality":
      return stepSchemas.personality;
    case "interests":
      return stepSchemas.interests;
    case "lifestyle":
      return stepSchemas.lifestyle;
    case "hair_color":
      return stepSchemas.hair_color;
    case "age_preference":
      return stepSchemas.age_preference;
    case "age":
      return stepSchemas.age;
    case "location":
      return stepSchemas.location;
    case "name":
      return stepSchemas.name;
    case "email":
      return stepSchemas.email;
    default:
      return z.object({});
  }
};
