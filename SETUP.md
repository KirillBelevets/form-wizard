# Setup Guide

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/form-wizard?retryWrites=true&w=majority
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Add it to `.env.local`

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Use: `MONGODB_URI=mongodb://localhost:27017/form-wizard`

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically

### Other Platforms

- **Netlify**: Use Netlify Functions
- **AWS**: Use Lambda + API Gateway
- **Railway**: Direct deployment with MongoDB Atlas

## Database Schema

The survey data is stored as a single document in MongoDB:

```json
{
  "_id": "ObjectId",
  "datetime": "2024-01-01T00:00:00.000Z",
  "gender": "I'm a man",
  "dating_experience": "Yes",
  "goals": ["Starting a chat first", "Talks late-night"],
  "topics": ["Books", "Sports"],
  "hair_color": "Brunette",
  "age_preference": "My age",
  "age": "Age 18-34",
  "name": "John Doe",
  "email": "john@example.com",
  "utm_campaign": "optional",
  "utm_content": "optional",
  "utm_source": "optional",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```
