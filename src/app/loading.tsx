"use client";

import { HeartPulse } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo with Pulse Effect */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20 blur-xl"></div>
          <div className="relative flex items-center justify-center">
            <HeartPulse className="h-16 w-16 text-primary animate-pulse" />
          </div>
        </div>

        {/* Loading Text with Gradient */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            PH HealthCare
          </h2>
          <p className="text-muted-foreground text-sm">
            Loading your experience...
          </p>
        </div>

        {/* Animated Loading Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-loading-bar"></div>
        </div>

        {/* Dots Animation */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>

      {/* Custom CSS for loading bar animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 50%;
            margin-left: 25%;
          }
          100% {
            width: 0%;
            margin-left: 100%;
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}