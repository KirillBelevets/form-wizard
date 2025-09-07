# SoulMatch - Multi-Step Dating Survey Application

A sophisticated, responsive multi-step dating survey built with Next.js 14, TypeScript, and Tailwind CSS. This application helps users find their perfect match through an engaging 19-step form wizard with various input types, UTM parameter tracking, and MongoDB integration.

## 🚀 Features

- **19-Step Form Wizard**: Comprehensive survey with various input types
- **UTM Parameter Tracking**: Automatic marketing attribution and analytics
- **MongoDB Integration**: Real-time data persistence and storage
- **Responsive Design**: Mobile-first design optimized for all devices
- **Form Validation**: Zod schemas for robust client and server-side validation
- **State Management**: Zustand with localStorage persistence
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Beautiful gradient design with smooth animations
- **Progress Tracking**: Visual progress bar and step indicators
- **Error Handling**: Comprehensive error handling and user feedback
- **Code Splitting**: Optimized performance with dynamic imports

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form
- **Validation**: Zod
- **State Management**: Zustand
- **Icons**: Lucide React + React Icons
- **Fonts**: Inter (Google Fonts)

### Backend

- **Runtime**: Next.js 14 API Routes
- **Validation**: Zod schemas
- **Database**: MongoDB Atlas integration
- **UTM Tracking**: Automatic marketing attribution

### Database

- **MongoDB Atlas**: Cloud database service
- **Collections**: Survey submissions with full data
- **Indexing**: Optimized for query performance

## 📋 Form Steps (19 Total)

1. **Welcome** - Hero page with SoulMatch branding
2. **Gender** - Single choice with custom Mars/Venus icons
3. **Dating Experience** - Single choice selection
4. **Relationship Goals** - Multi-select options
5. **Personality Traits** - Multi-select options
6. **Interests** - Multi-select options
7. **Topics** - Grid multi-select with "None of the above"
8. **Lifestyle** - Single choice selection
9. **Hair Color** - Single choice selection
10. **Age Preference** - Single choice selection
11. **Age Verification** - Single choice with validation
12. **Location** - Single choice selection
13. **Traffic Source** - Single choice with UTM mapping
14. **Analysis** - Animated processing sequence
15. **Name Input** - Text input with validation
16. **Email Collection** - Email input with real-time validation
17. **Stats** - Information page with user statistics
18. **Loading** - Processing page
19. **Complete** - Success confirmation screen

## 📊 UTM Parameter Tracking

The application automatically tracks marketing attribution through UTM parameters:

### Traffic Sources

- **Google Search** → `utm_source: "google"`, `utm_campaign: "organic_search_2025"`
- **Facebook** → `utm_source: "facebook"`, `utm_campaign: "social_media_2025"`
- **Instagram** → `utm_source: "instagram"`, `utm_campaign: "social_media_2025"`
- **TikTok** → `utm_source: "tiktok"`, `utm_campaign: "social_media_2025"`
- **YouTube** → `utm_source: "youtube"`, `utm_campaign: "video_marketing_2025"`
- **Twitter/X** → `utm_source: "twitter"`, `utm_campaign: "social_media_2025"`
- **LinkedIn** → `utm_source: "linkedin"`, `utm_campaign: "professional_networking_2025"`
- **Email Newsletter** → `utm_source: "email"`, `utm_campaign: "email_marketing_2025"`
- **Friend Referral** → `utm_source: "referral"`, `utm_campaign: "word_of_mouth_2025"`
- **Other Website** → `utm_source: "referral"`, `utm_campaign: "partner_website_2025"`
- **Direct Visit** → `utm_source: "direct"`, `utm_campaign: "direct_traffic_2025"`

### Benefits

- **Marketing Analytics**: Track which channels bring the most users
- **Campaign Attribution**: Know which campaigns are working
- **Content Performance**: See which content types convert best
- **ROI Measurement**: Measure return on marketing investment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd form-wizard
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soulmatch
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── survey/
│   │       └── route.ts          # API endpoint for form submission
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── FormWizard.tsx            # Main form wizard component
│   ├── FormWizardClient.tsx      # Client-side wrapper
│   └── pages/                    # Page components
│       ├── BasePage.tsx          # Base page layout
│       ├── InfoPage.tsx          # Information pages
│       ├── SingleChoicePage.tsx  # Single choice selection
│       ├── MultiSelectPage.tsx   # Multi-select options
│       ├── CompactMultiSelectPage.tsx # Compact multi-select
│       ├── GridMultiSelectPage.tsx    # Grid multi-select
│       ├── TextInputPage.tsx     # Text input
│       ├── EmailInputPage.tsx    # Email input with validation
│       ├── AgeVerificationPage.tsx    # Age verification
│       ├── GenderPage.tsx        # Gender selection
│       ├── AnalysisPage.tsx      # Analysis animation
│       └── PageBuilder.tsx       # Dynamic page renderer
├── hooks/
│   └── useFormLogic.ts           # Form logic and validation
├── lib/
│   ├── database.ts               # Database utilities
│   ├── formSteps.ts              # Form steps configuration
│   ├── formSubmission.ts         # Form submission logic
│   ├── mongodb.ts                # MongoDB connection
│   └── utmMapping.ts             # UTM parameter mapping
├── store/
│   └── formStore.ts              # Zustand store for state management
└── types/
    └── index.ts                  # TypeScript type definitions
```

## 🔧 Configuration

### Form Steps

Form steps are configured in `src/lib/formSteps.ts`. You can easily modify:

- Step titles and descriptions
- Input types and options
- Validation rules
- Required fields

### State Management

The application uses Zustand for state management. The store is defined in `src/store/formStore.ts` and includes:

- Current step tracking
- Form data persistence
- Error handling
- Navigation controls

### API Endpoints

- `POST /api/survey` - Submit survey data
- `GET /api/survey` - Get API information

## 🎨 Customization

### Styling

The application uses Tailwind CSS with a custom color scheme:

- Primary: Pink to Purple gradient
- Background: Light pink to purple gradient
- Text: Gray scale

### Form Validation

Validation schemas are defined using Zod in `src/lib/formSteps.ts`. Each step has its own validation schema.

## 🚀 Deployment

### Vercel (Recommended)

**Why Vercel?**

- **Cost-effective**: No surprise bills like AWS
- **Next.js optimized**: Built specifically for Next.js applications
- **Easy deployment**: Git-based deployment with automatic builds
- **Built-in analytics**: Traffic and performance insights
- **Global CDN**: Fast loading worldwide
- **Environment variables**: Easy configuration management

**Deployment Steps:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NEXT_PUBLIC_APP_URL`: Your Vercel domain
5. Deploy automatically!

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📊 Database Integration

The application includes **full MongoDB Atlas integration**:

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Add it to your environment variables as `MONGODB_URI`

### Database Schema

```typescript
interface SurveyData {
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
```

### Features

- **Automatic collection creation**: Collections are created on first submission
- **Data validation**: Zod schemas ensure data integrity
- **Error handling**: Comprehensive error handling and logging
- **Performance**: Optimized queries and indexing

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run build
```

## 📝 API Documentation

### POST /api/survey

Submit survey data.

**Request Body:**

```json
{
  "datetime": "2025-01-01T00:00:00.000Z",
  "gender": "Man",
  "dating_experience": "No, this is my first time",
  "goals": ["Marriage", "Friendship"],
  "personality": ["Intellectual", "Adventurous"],
  "interests": ["Cooking & Food", "Art & Culture"],
  "topics": ["Politics", "Sports"],
  "lifestyle": "I enjoy a mix of both",
  "hair_color": "Brown",
  "age_preference": "A few years older",
  "age": "Age 18-34",
  "location": "North America",
  "traffic_source": "Google Search",
  "name": "John Doe",
  "email": "user@example.com",
  "utm_campaign": "organic_search_2025",
  "utm_content": "search_results",
  "utm_source": "google"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Survey submitted successfully",
  "id": "68bd3ddec8e5a62335a6e37f"
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [x] Database integration (MongoDB Atlas)
- [x] UTM parameter tracking
- [x] Email validation
- [x] Responsive design
- [x] Code splitting
- [ ] Email confirmation system
- [ ] Analytics dashboard
- [ ] Admin panel
- [ ] Multi-language support
- [ ] A/B testing capabilities
- [ ] Advanced form logic
- [ ] File upload support
- [ ] Social media integration
- [ ] Mobile app version
- [ ] Real-time analytics
- [ ] User authentication
- [ ] Data export features
