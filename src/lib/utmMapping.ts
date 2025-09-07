// UTM parameter mapping based on traffic source selection
export interface UTMParameters {
  utm_source: string;
  utm_campaign: string;
  utm_content: string;
}

// Map traffic source selections to UTM parameters
export const getUTMParameters = (trafficSource: string): UTMParameters => {
  const utmMappings: Record<string, UTMParameters> = {
    "Google Search": {
      utm_source: "google",
      utm_campaign: "organic_search_2025",
      utm_content: "search_results",
    },
    Facebook: {
      utm_source: "facebook",
      utm_campaign: "social_media_2025",
      utm_content: "facebook_post",
    },
    Instagram: {
      utm_source: "instagram",
      utm_campaign: "social_media_2025",
      utm_content: "instagram_story",
    },
    TikTok: {
      utm_source: "tiktok",
      utm_campaign: "social_media_2025",
      utm_content: "tiktok_video",
    },
    YouTube: {
      utm_source: "youtube",
      utm_campaign: "video_marketing_2025",
      utm_content: "youtube_ad",
    },
    "Twitter/X": {
      utm_source: "twitter",
      utm_campaign: "social_media_2025",
      utm_content: "twitter_post",
    },
    LinkedIn: {
      utm_source: "linkedin",
      utm_campaign: "professional_networking_2025",
      utm_content: "linkedin_ad",
    },
    "Email Newsletter": {
      utm_source: "email",
      utm_campaign: "email_marketing_2025",
      utm_content: "newsletter_signup",
    },
    "Friend Referral": {
      utm_source: "referral",
      utm_campaign: "word_of_mouth_2025",
      utm_content: "friend_recommendation",
    },
    "Other Website": {
      utm_source: "referral",
      utm_campaign: "partner_website_2025",
      utm_content: "external_link",
    },
    "Direct Visit": {
      utm_source: "direct",
      utm_campaign: "direct_traffic_2025",
      utm_content: "bookmark_or_typing",
    },
  };

  return (
    utmMappings[trafficSource] || {
      utm_source: "unknown",
      utm_campaign: "unknown_source_2025",
      utm_content: "unknown_referral",
    }
  );
};

// Helper function to update form data with UTM parameters
export const updateFormDataWithUTM = (
  formData: any,
  trafficSource: string
): any => {
  const utmParams = getUTMParameters(trafficSource);

  return {
    ...formData,
    utm_source: utmParams.utm_source,
    utm_campaign: utmParams.utm_campaign,
    utm_content: utmParams.utm_content,
    traffic_source: trafficSource,
  };
};
