import React from "react";
import HeroSection from "../components/qa/hero/HeroSection";
import QuestionForm from "../components/qa/form/QuestionForm";
import QAStats from "../components/qa/stats/QAStats";
import QAFeed from "../components/qa/feed/QAFeed";

// Main App Component - now using refactored components with Redux
export default function IslamicQAApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-800 relative">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm0 0c0 11.046-8.954 20-20 20S-10 41.046-10 30s8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 overflow-x-hidden">
        <HeroSection />
        <div className="grid lg:grid-cols-3 gap-8 mt-12 w-full">
          <div className="lg:col-span-1 space-y-8 min-w-0">
            <QuestionForm />
            <QAStats />
          </div>
          <div className="lg:col-span-2 min-w-0">
            <QAFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
