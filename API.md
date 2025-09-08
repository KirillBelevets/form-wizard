# SoulMatch API Documentation

## Overview

The SoulMatch API provides endpoints for handling survey form submissions. Built with Next.js API Routes and MongoDB integration.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.vercel.app/api`

## Authentication

No authentication required for survey submissions.

## Endpoints

### POST /api/survey

Submit survey data to the database.

#### Request

**URL**: `/api/survey`  
**Method**: `POST`  
**Content-Type**: `application/json`

#### Request Body Schema

```typescript
interface SurveyData {
  datetime?: string; // ISO 8601 timestamp
  gender?: string; // "Man" | "Woman"
  dating_experience?: string; // User's dating experience level
  goals?: string[]; // Array of dating goals
  personality?: string[]; // Array of personality traits
  interests?: string[]; // Array of interests
  topics?: string[]; // Array of conversation topics
  lifestyle?: string; // Lifestyle preference
  hair_color?: string; // Hair color preference
  age_preference?: string; // Preferred age range
  age?: string; // User's age range
  location?: string; // User's location
  traffic_source?: string; // How user found the site
  name?: string; // User's name
  email?: string; // User's email (validated)
  utm_campaign?: string; // UTM campaign parameter
  utm_content?: string; // UTM content parameter
  utm_source?: string; // UTM source parameter
}
```

#### Example Request

```json
{
  "datetime": "2025-01-07T10:30:00.000Z",
  "gender": "Man",
  "dating_experience": "Some experience",
  "goals": ["Long-term relationship", "Marriage"],
  "personality": ["Adventurous", "Funny"],
  "interests": ["Travel", "Music"],
  "topics": ["Career", "Hobbies"],
  "lifestyle": "Active",
  "hair_color": "Blonde",
  "age_preference": "25-35",
  "age": "25-30",
  "location": "New York",
  "traffic_source": "Google Ads",
  "name": "John Doe",
  "email": "john@example.com",
  "utm_campaign": "dating_2025",
  "utm_content": "google_ads_2025",
  "utm_source": "google"
}
```

#### Response

**Success Response (200)**

```json
{
  "success": true,
  "message": "Survey submitted successfully",
  "id": "65f8a1b2c3d4e5f6a7b8c9d0"
}
```

**Error Response (400)**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Please enter a valid email address",
    "age": "Please select your age range"
  }
}
```

**Error Response (500)**

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

#### Validation Rules

| Field            | Type     | Required | Validation                     |
| ---------------- | -------- | -------- | ------------------------------ |
| `email`          | string   | Yes      | Valid email format             |
| `age`            | string   | Yes      | Must be selected               |
| `gender`         | string   | Yes      | "Man" or "Woman"               |
| `goals`          | string[] | Yes      | At least one selection         |
| `personality`    | string[] | Yes      | At least one selection         |
| `interests`      | string[] | Yes      | At least one selection         |
| `topics`         | string[] | Yes      | At least one selection         |
| `lifestyle`      | string   | Yes      | Must be selected               |
| `hair_color`     | string   | Yes      | Must be selected               |
| `age_preference` | string   | Yes      | Must be selected               |
| `location`       | string   | Yes      | Must be selected               |
| `traffic_source` | string   | Yes      | Must be selected               |
| `name`           | string   | No       | Optional text input            |
| `datetime`       | string   | No       | Auto-generated if not provided |

## Error Codes

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | Success                        |
| 400  | Bad Request - Validation error |
| 405  | Method Not Allowed             |
| 500  | Internal Server Error          |

## Rate Limiting

No rate limiting currently implemented. Consider implementing if needed for production.

## CORS

CORS is handled by Next.js. All origins are allowed for survey submissions.

## Database Schema

The survey data is stored in MongoDB with the following structure:

```javascript
{
  _id: ObjectId,
  datetime: String,
  gender: String,
  dating_experience: String,
  goals: [String],
  personality: [String],
  interests: [String],
  topics: [String],
  lifestyle: String,
  hair_color: String,
  age_preference: String,
  age: String,
  location: String,
  traffic_source: String,
  name: String,
  email: String,
  utm_campaign: String,
  utm_content: String,
  utm_source: String,
  createdAt: Date,
  updatedAt: Date
}
```

## UTM Parameter Mapping

The API automatically maps traffic source selections to UTM parameters:

| Traffic Source    | utm_source  | utm_campaign  | utm_content            |
| ----------------- | ----------- | ------------- | ---------------------- |
| "Google Ads"      | "google"    | "dating_2025" | "google_ads_2025"      |
| "Facebook"        | "facebook"  | "dating_2025" | "facebook_ads_2025"    |
| "Instagram"       | "instagram" | "dating_2025" | "instagram_ads_2025"   |
| "TikTok"          | "tiktok"    | "dating_2025" | "tiktok_ads_2025"      |
| "YouTube"         | "youtube"   | "dating_2025" | "youtube_ads_2025"     |
| "Organic Search"  | "organic"   | "dating_2025" | "organic_search_2025"  |
| "Friend Referral" | "referral"  | "dating_2025" | "friend_referral_2025" |
| "Other"           | "other"     | "dating_2025" | "other_source_2025"    |

## Testing

### cURL Example

```bash
curl -X POST http://localhost:3000/api/survey \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "Man",
    "dating_experience": "Some experience",
    "goals": ["Long-term relationship"],
    "personality": ["Adventurous"],
    "interests": ["Travel"],
    "topics": ["Career"],
    "lifestyle": "Active",
    "hair_color": "Blonde",
    "age_preference": "25-35",
    "age": "25-30",
    "location": "New York",
    "traffic_source": "Google Ads",
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### JavaScript Example

```javascript
const response = await fetch("/api/survey", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    gender: "Man",
    dating_experience: "Some experience",
    goals: ["Long-term relationship"],
    personality: ["Adventurous"],
    interests: ["Travel"],
    topics: ["Career"],
    lifestyle: "Active",
    hair_color: "Blonde",
    age_preference: "25-35",
    age: "25-30",
    location: "New York",
    traffic_source: "Google Ads",
    name: "John Doe",
    email: "john@example.com",
  }),
});

const result = await response.json();
console.log(result);
```

## Monitoring

- All requests are logged (in development)
- Database operations are monitored
- Error responses include detailed messages
- Success responses include database record ID

## Security Considerations

- Input validation using Zod schemas
- No SQL injection (using MongoDB)
- Email format validation
- Required field validation
- Type safety with TypeScript
