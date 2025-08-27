import React from "react";
import { BookOpen } from "lucide-react";

function HeroSection() {
  return (
    <div className="text-center mb-16 relative">
      {/* Glassmorphism Card */}
      <div className="backdrop-blur-xl bg-white dark:bg-black/40 bg-opacity-20 rounded-3xl border border-white dark:border-emerald-600 border-opacity-30 p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent mb-4">
          Ask a Scholar
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-100 max-w-2xl mx-auto leading-relaxed">
          Connect with Islamic scholars and get authentic answers to your
          questions about faith, daily life, and Islamic jurisprudence in a
          respectful community environment.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {[
            "Authentic Sources",
            "Quick Responses",
            "Community Verified",
            "Free Access",
          ].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-200 transition-colors cursor-default"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;