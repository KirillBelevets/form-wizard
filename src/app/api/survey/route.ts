import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { saveSurvey } from "@/lib/mongodb";

// Required for MongoDB connections in Next.js
export const dynamic = "force-dynamic";

// Database schema validation
const surveySchema = z.object({
  datetime: z.string().datetime(),
  gender: z.string().min(1),
  dating_experience: z.string().min(1),
  goals: z.array(z.string()).min(1),
  personality: z.array(z.string()).min(1),
  interests: z.array(z.string()).min(1),
  topics: z.array(z.string()).min(1),
  lifestyle: z.string().min(1),
  hair_color: z.string().min(1),
  age_preference: z.string().min(1),
  age: z.string().min(1),
  location: z.string().min(1),
  traffic_source: z.string().min(1),
  name: z.string().optional(),
  email: z.string().email(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_source: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = surveySchema.parse(body);

    // Log the request
    console.log("Survey submission received:", {
      timestamp: new Date().toISOString(),
      data: validatedData,
      userAgent: request.headers.get("user-agent"),
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip"),
    });

    // Save to MongoDB
    const result = await saveSurvey(validatedData);

    console.log("Survey saved to database:", result.insertedId);

    return NextResponse.json(
      {
        success: true,
        message: "Survey submitted successfully",
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Survey submission error:", error);
    console.error("Error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    if (error instanceof z.ZodError) {
      console.error("Validation errors:", error.issues);
      return NextResponse.json(
        {
          success: false,
          message: "Invalid form data",
          errors: error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "Survey API endpoint",
      methods: ["POST"],
      description: "Submit survey data",
    },
    { status: 200 }
  );
}
