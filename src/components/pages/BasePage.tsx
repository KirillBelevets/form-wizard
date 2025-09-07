"use client";

import { ReactNode } from "react";
import { FormStep } from "@/types";

interface BasePageProps {
  stepData: FormStep;
  children: ReactNode;
  className?: string;
}

export default function BasePage({
  stepData,
  children,
  className = "",
}: BasePageProps) {
  return (
    <div className={`space-y-6 sm:space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-responsive-xl">
          {stepData.title}
        </h2>
        {stepData.description && (
          <p className="text-gray-600 mt-3 text-base sm:text-lg text-responsive-lg">
            {stepData.description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
