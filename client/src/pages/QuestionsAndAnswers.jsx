import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Send,
  Heart,
  MessageCircle,
  Filter,
  Star,
  User,
  Clock,
  ChevronDown,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  Check,
  Medal,
} from "lucide-react";

// Main App Component
export default function IslamicQAApp() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 relative">
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

      <div className="container mx-auto px-4 py-8 relative z-10">
        <HeroSection />
        <div className="grid lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-1">
            <QuestionForm />
            <QAStats />
          </div>
          <div className="lg:col-span-2">
            <QAFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="text-center mb-16 relative">
      {/* Glassmorphism Card */}
      <div className="backdrop-blur-xl bg-white bg-opacity-20 rounded-3xl border border-white border-opacity-30 p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-4">
          Ask a Scholar
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
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

// Modern Custom Dropdown Component
function CustomDropdown({ options, value, onChange, placeholder, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white bg-opacity-90 backdrop-blur-sm border border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          {Icon && (
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
          )}
          <span className={selectedOption ? "text-gray-800" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 bg-white backdrop-blur-xl bg-opacity-95 border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="px-4 py-3 hover:bg-emerald-50 cursor-pointer transition-all duration-200 flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                {option.icon && (
                  <option.icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" />
                )}
                <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                  {option.label}
                </span>
              </div>
              {value === option.value && (
                <Check className="w-4 h-4 text-emerald-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function QuestionForm() {
  const [formData, setFormData] = useState({
    question: "",
    name: "",
    email: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "General Questions" },
    { value: "fiqh", label: "Islamic Jurisprudence" },
    { value: "finance", label: "Islamic Finance" },
    { value: "daily-life", label: "Daily Life" },
    { value: "worship", label: "Worship & Prayer" },
  ];

  const handleSubmit = async () => {
    if (
      !formData.question.trim() ||
      !formData.name.trim() ||
      !formData.email.trim()
    ) {
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ question: "", name: "", email: "", category: "general" });
  };

  return (
    <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Submit Your Question
        </h2>
      </div>

      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Question Category
          </label>
          <CustomDropdown
            options={categories}
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            placeholder="Select a category"
            icon={Filter}
          />
        </div>

        {/* Question Textarea */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Your Question
          </label>
          <textarea
            value={formData.question}
            onChange={(e) =>
              setFormData({ ...formData, question: e.target.value })
            }
            placeholder="Share your question with our scholars..."
            rows={4}
            className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
          />
        </div>

        {/* Name and Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div
          onClick={handleSubmit}
          className={`w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer select-none ${
            isSubmitting ? "opacity-50 cursor-not-allowed transform-none" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Question
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Q&A Statistics Component
function QAStats() {
  const stats = [
    {
      icon: MessageCircle,
      label: "Questions Answered",
      value: "2,847",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Medal,
      label: "Active Scholars",
      value: "23",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: "156",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Community Stats</h3>
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4">
            <div
              className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Q&A Feed Component
function QAFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = [
    { value: "all", label: "All Questions", icon: MessageCircle },
    { value: "answered", label: "Answered", icon: CheckCircle },
    { value: "pending", label: "Pending", icon: Clock },
    { value: "finance", label: "Islamic Finance", icon: TrendingUp },
    { value: "daily-life", label: "Daily Life", icon: Medal },
    { value: "worship", label: "Worship", icon: Star },
  ];

  const qaData = [
    {
      id: 1,
      user: "Fatima Khan",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=100&h=100&fit=crop&crop=face",
      question:
        "What are the key principles of Islamic finance, and how do they differ from conventional finance?",
      category: "finance",
      timeAgo: "2 days ago",
      likes: 24,
      hasAnswer: true,
      scholar: "Scholar Ahmed",
      scholarAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      answer:
        "Islamic finance is based on principles such as the prohibition of interest (riba), risk-sharing, and ethical investing. It differs from conventional finance by avoiding interest-based transactions and promoting fairness and social responsibility.",
      answerTime: "1 day ago",
    },
    {
      id: 2,
      user: "Omar Hassan",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      question:
        "How can I balance my professional career with my religious obligations as a Muslim?",
      category: "daily-life",
      timeAgo: "3 days ago",
      likes: 18,
      hasAnswer: true,
      scholar: "Scholar Ahmed",
      scholarAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      answer:
        "Balancing your career and religious obligations involves time management, prioritizing prayers and religious duties, and seeking opportunities to integrate your faith into your work life. It's about finding harmony between your professional and spiritual commitments.",
      answerTime: "2 days ago",
    },
    {
      id: 3,
      user: "Aisha Abdullah",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      question: "What is the proper etiquette for making dua during prayer?",
      category: "worship",
      timeAgo: "1 day ago",
      likes: 12,
      hasAnswer: false,
    },
  ];

  const filteredQA = useMemo(() => {
    return qaData.filter((qa) => {
      const matchesSearch =
        qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.user.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedFilter === "all") return matchesSearch;
      if (selectedFilter === "answered") return matchesSearch && qa.hasAnswer;
      if (selectedFilter === "pending") return matchesSearch && !qa.hasAnswer;
      return matchesSearch && qa.category === selectedFilter;
    });
  }, [searchQuery, selectedFilter, qaData]);

  return (
    <div>
      {/* Search and Filter Section */}
      <div className="backdrop-blur-xl relative z-20 bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 p-6 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-90 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="w-full md:w-64">
            <CustomDropdown
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
              placeholder="Filter questions"
              icon={Filter}
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-emerald-600" />
          Recent Questions & Answers
          <span className="text-lg text-gray-500 font-normal">
            ({filteredQA.length})
          </span>
        </h2>
      </div>

      {/* Q&A Cards */}
      <div className="space-y-6">
        {filteredQA.map((qa) => (
          <QACard key={qa.id} qa={qa} />
        ))}
      </div>
    </div>
  );
}

// Individual Q&A Card Component
function QACard({ qa }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="backdrop-blur-xl bg-white bg-opacity-80 rounded-2xl border border-white border-opacity-50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Question Section */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800">{qa.user}</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium capitalize">
                  {qa.category.replace("-", " ")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {qa.timeAgo}
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">{qa.question}</p>

            {/* Question Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isLiked
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-sm font-medium">
                  {qa.likes + (isLiked ? 1 : 0)}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {qa.hasAnswer ? (
                  <span className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Answered
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-amber-600 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answer Section */}
      {qa.hasAnswer && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-100 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-emerald-800 flex justify-center items-center">
                  <Star  className="w-7 h-7 rounded-full text-white fill-white bg-green-600 p-1 mr-4" />
                  {qa.scholar}
                  
                </h4>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Clock className="w-4 h-4" />
                  {qa.answerTime}
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
