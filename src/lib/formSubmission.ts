import { SurveyData } from "@/types";

// Form submission service for SSG
export async function submitSurvey(
  data: SurveyData
): Promise<{ success: boolean; message: string }> {
  try {
    // Option 1: Use Formspree or similar service
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    // Option 2: Use Netlify Forms (if deploying to Netlify)
    const formData = new URLSearchParams();
    formData.append("form-name", "survey");
    formData.append("datetime", data.datetime);
    formData.append("gender", data.gender);
    formData.append("dating_experience", data.dating_experience);
    formData.append("goals", JSON.stringify(data.goals));
    formData.append("personality", JSON.stringify(data.personality));
    formData.append("interests", JSON.stringify(data.interests));
    formData.append("lifestyle", data.lifestyle);
    formData.append("hair_color", data.hair_color);
    formData.append("age_preference", data.age_preference);
    formData.append("age", data.age);
    formData.append("location", data.location);
    formData.append("traffic_source", data.traffic_source);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("utm_campaign", data.utm_campaign || "");
    formData.append("utm_content", data.utm_content || "");
    formData.append("utm_source", data.utm_source || "");

    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (response.ok) {
      return { success: true, message: "Survey submitted successfully!" };
    } else {
      throw new Error("Failed to submit survey");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Failed to submit survey. Please try again.",
    };
  }
}

// Alternative: Direct API integration (for when you have a backend)
export async function submitToAPI(
  data: SurveyData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch("/api/survey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        message: result.message || "Survey submitted successfully!",
      };
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit survey");
    }
  } catch (error) {
    console.error("API submission error:", error);
    return {
      success: false,
      message: "Failed to submit survey. Please try again.",
    };
  }
}
