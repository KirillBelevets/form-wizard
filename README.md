# SoulMatch - Dating Survey Form

A modern, responsive multi-step survey form built with Next.js, TypeScript, and Tailwind CSS. This project demonstrates advanced form handling, state management, and database integration.

## 🚀 Features

- **18 Interactive Pages** - Multiple page types including single choice, multi-select, text input, and information screens
- **Responsive Design** - Optimized for mobile and desktop devices
- **Type Safety** - Full TypeScript implementation with precise types
- **Form Validation** - Zod schemas with React Hook Form integration
- **State Management** - Zustand for global state with persistence
- **Database Integration** - MongoDB Atlas for data storage
- **UTM Tracking** - Marketing campaign parameter tracking
- **Email Validation** - Real-time email format validation
- **Auto-progression** - Smart form flow with conditional navigation

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **Icons**: Lucide React + React Icons
- **Fonts**: Inter (Google Fonts)

### Backend

- **API**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Validation**: Zod schemas
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/survey/route.ts    # Survey submission API
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── FormWizard.tsx         # Main form component
│   ├── FormWizardClient.tsx   # Client-side wrapper
│   └── pages/                 # Page components
│       ├── BasePage.tsx       # Base page layout
│       ├── InfoPage.tsx       # Information pages
│       ├── SingleChoicePage.tsx
│       ├── MultiSelectPage.tsx
│       ├── TextInputPage.tsx
│       ├── EmailInputPage.tsx
│       ├── AgeVerificationPage.tsx
│       ├── GenderPage.tsx
│       ├── AnalysisPage.tsx
│       └── PageBuilder.tsx    # Dynamic page renderer
├── hooks/
│   └── useFormLogic.ts        # Form logic hook
├── lib/
│   ├── formSteps.ts           # Form configuration
│   ├── mongodb.ts             # Database connection
│   ├── formSubmission.ts      # Submission utilities
│   └── utmMapping.ts          # UTM parameter mapping
├── store/
│   └── formStore.ts           # Zustand store
└── types/
    └── index.ts               # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/KirillBelevets/form-wizard.git
   cd form-wizard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` file:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/soulmatch
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📊 Form Pages

The survey includes 18 carefully designed pages:

1. **Welcome** - Hero introduction
2. **Gender** - Man/Woman selection
3. **Stats** - Information about SoulMatch
4. **Dating Experience** - Single choice
5. **Goals** - Multi-select dating goals
6. **Personality** - Multi-select traits
7. **Interests** - Multi-select interests
8. **Topics** - Multi-select conversation topics
9. **Lifestyle** - Single choice lifestyle
10. **Hair Color** - Single choice preference
11. **Age Preference** - Single choice range
12. **Age Verification** - 18+ verification
13. **Location** - Single choice location
14. **Traffic Source** - UTM tracking setup
15. **Analysis** - Animated processing screen
16. **Name** - Text input
17. **Email** - Email input with validation
18. **Success** - Completion confirmation

## 🔧 API Documentation

### POST /api/survey

Submit survey data to the database.

**Request Body:**

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

**Response:**

```json
{
  "success": true,
  "message": "Survey submitted successfully",
  "id": "65f8a1b2c3d4e5f6a7b8c9d0"
}
```

## 🎨 Design System

### Colors

- **Primary**: Pink gradient (`from-pink-50 to-purple-50`)
- **Accent**: Pink (`#ec4899`)
- **Text**: Gray scale (`text-gray-900`, `text-gray-600`)
- **Success**: Green (`#10b981`)
- **Error**: Red (`#ef4444`)

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: `text-2xl sm:text-3xl font-bold`
- **Body**: `text-base sm:text-lg`
- **Small**: `text-sm text-gray-500`

### Components

- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Gradient backgrounds, smooth transitions
- **Inputs**: Focus states, validation styling
- **Icons**: Consistent sizing and colors

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository**
2. **Set environment variables**:
   - `MONGODB_URI`: Your MongoDB connection string
3. **Deploy**: Automatic deployment on push to main

### Manual Deployment

```bash
npm run build
npm start
```

## 📈 Performance

- **Page Load**: < 3 seconds
- **Bundle Size**: ~138KB (First Load JS)
- **Lighthouse Score**: 90+ (Performance)
- **Core Web Vitals**: Optimized

## 🔒 Security

- **HTTPS**: Required for all endpoints
- **Input Validation**: Zod schemas prevent malicious input
- **Data Sanitization**: All user inputs are validated
- **Environment Variables**: Sensitive data in `.env.local`

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build verification
npm run build
```

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Kirill Belevets**

- GitHub: [@KirillBelevets](https://github.com/KirillBelevets)
- Project: [SoulMatch Form](https://github.com/KirillBelevets/form-wizard)

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
