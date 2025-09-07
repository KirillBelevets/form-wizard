"use client";

import { useEffect, useState, useRef } from "react";
import BasePage from "./BasePage";
import { FormStep } from "@/types";
import { Brain, Sparkles, Heart, Users, Star, Zap } from "lucide-react";

interface AnalysisPageProps {
  stepData: FormStep;
  onProceed: () => void;
}

export default function AnalysisPage({
  stepData,
  onProceed,
}: AnalysisPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hasCalledOnProceed = useRef(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const analysisSteps = [
    {
      icon: Brain,
      text: "Analyzing your preferences...",
      color: "text-blue-500",
    },
    {
      icon: Heart,
      text: "Finding compatible personalities...",
      color: "text-pink-500",
    },
    {
      icon: Users,
      text: "Matching with potential partners...",
      color: "text-purple-500",
    },
    {
      icon: Star,
      text: "Calculating compatibility scores...",
      color: "text-yellow-500",
    },
    { icon: Zap, text: "Finalizing your matches...", color: "text-green-500" },
  ];

  useEffect(() => {
    if (!isMounted) return;

    console.log("AnalysisPage mounted, starting animation...");

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          setIsComplete(true);
          clearInterval(interval);
          // Auto-proceed after showing completion - only call once
          if (!hasCalledOnProceed.current) {
            hasCalledOnProceed.current = true;
            setTimeout(() => {
              console.log("AnalysisPage calling onProceed...");
              onProceed();
            }, 1500);
          }
          return prev;
        }
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onProceed, isMounted]);

  // Show loading state during hydration
  if (!isMounted) {
    return (
      <BasePage stepData={stepData}>
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {stepData.title}
            </h2>
            {stepData.description && (
              <p className="text-gray-600 text-base sm:text-lg">
                {stepData.description}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
          </div>
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage stepData={stepData}>
      <div className="text-center space-y-8">
        {/* Analysis animation */}
        <div className="space-y-6">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={index}
                className={`flex items-center justify-center space-x-4 transition-all duration-500 ${
                  isActive
                    ? "scale-105 opacity-100"
                    : isCompleted
                    ? "opacity-60 scale-95"
                    : "opacity-30 scale-90"
                }`}
              >
                {/* Icon with animation */}
                <div
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-100 to-purple-100 shadow-lg"
                      : isCompleted
                      ? "bg-green-100"
                      : "bg-gray-100"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive
                        ? `${step.color} animate-pulse`
                        : isCompleted
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                  {/* Pulsing ring for active step */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full border-2 border-pink-300 animate-ping"></div>
                  )}
                </div>

                {/* Step text */}
                <span
                  className={`text-sm sm:text-base font-medium transition-all duration-300 ${
                    isActive
                      ? "text-gray-900"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {step.text}
                </span>

                {/* Checkmark for completed steps */}
                {isCompleted && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion message */}
        {isComplete && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-green-500 animate-bounce" />
              <h3 className="text-lg font-semibold text-green-800">
                Analysis Complete!
              </h3>
              <Sparkles className="w-6 h-6 text-green-500 animate-bounce" />
            </div>
            <p className="text-green-700 text-sm">
              We've found your perfect matches! Redirecting to next step...
            </p>
          </div>
        )}

        {/* Loading dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full bg-pink-400 animate-pulse ${
                isComplete ? "opacity-30" : ""
              }`}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>
      </div>
    </BasePage>
  );
}
