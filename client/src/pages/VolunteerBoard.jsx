import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Clock,
  MapPin,
  Users,
  Calendar,
  ArrowRight,
  Heart,
  Star,
  ChevronDown,
  Menu,
  X,
  Bell,
  BookOpen,
  Handshake,
  Home,
  User,
  CheckCircle,
  Award,
  TrendingUp,
} from "lucide-react";

// Enhanced volunteer opportunities data
const volunteerOpportunities = [
  {
    id: 1,
    category: "Mosque Events",
    title: "Event Coordinator",
    organization: "Islamic Center of Al-Madinah",
    description:
      "Assist in planning and executing mosque events, including religious holidays and community gatherings.",
    location: "Al-Madinah",
    timeCommitment: "10-15 hours/week",
    skillLevel: "Intermediate",
    skills: ["Event Planning", "Communication", "Organization"],
    urgency: "high",
    spotsAvailable: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEOEpGTApQ3l8OXbTJTEIwnYnBsZNqJ083QnGK1cYgXtpwASt9jDN_1RWFnI57db_-uXFvtb9ryzhLZUBVkXzerstBAlWyAMaOjOA8z8J46RvUS4Dwx6EPAxtdAgePiXkwjI-7THOg4Hw67paQf24LbMc6SfmLVlZrtVHeAh782FDH_Ku9JR_v2ICQg5ET8XBIi9_iNJ0MoGTb5yCnbf9hQyiiMrLtlGN95_rnqb9amOrLDHe0MdITPLQulmh8guRYTVXsJ73txFo",
    remote: false,
  },
  {
    id: 2,
    category: "Mosque Events",
    title: "Volunteer Assistant",
    organization: "Al-Noor Mosque",
    description:
      "Provide support during events, including setup, registration, and assisting attendees.",
    location: "Al-Noor",
    timeCommitment: "5-8 hours/week",
    skillLevel: "Beginner",
    skills: ["Customer Service", "Organization"],
    urgency: "medium",
    spotsAvailable: 8,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfgrObmktq0xWQUsNeRB17twYoQsOvEFaiQxuMrRV2SqKQ8o5o8FUgtFs6vUkrUgLdALNU37Bj3yj0ZostDnN6pLqK4mQ2Ag7xnZXu-gBMyLCXhUl_i9wcv5Knmmg9DrLzNPTkl54za5wrqp0HBhXSr_emD6Z2FoMK8Q9v1hWBhVmZc6v3nNHwVcBdovauNVQJb0J-PAiAsv8IKUBcXL9pJwx6qxT4Zib_1HtjGUD4pFEhX-XQ4fmhZyj5PCtkLdCds4-jKiGlxzA",
    remote: false,
  },
  {
    id: 3,
    category: "Educational Programs",
    title: "Teaching Assistant",
    organization: "Al-Falah Academy",
    description:
      "Support teachers in delivering educational programs for children and adults, including Islamic studies and language classes.",
    location: "Al-Falah",
    timeCommitment: "8-12 hours/week",
    skillLevel: "Intermediate",
    skills: ["Teaching", "Arabic", "Islamic Studies"],
    urgency: "high",
    spotsAvailable: 5,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-hghCECcS9zMNJKHU8vsximzBF6tzrnkfn8imXS0uVRo2bGfo9T0knEenSh6Wpl3vAJ1QChitC4W9ib74mE_JVX8Pw0NC0NU6RMf_Zo9KIjULCr-LIH5pBZ595sAmme3MiqHGzZSm9fOan_y3zBkiVJU4QtUTuriWlScF6FuvH9eYA3w8EvlXrEnH6WK_DXmx_ftFTpGROdIh9Ig42QeIkbnn8OYXXr9Ja4DJL320URsgV7MXa3hup7BzN27EEhL4LoG8w8qfT1I",
    remote: true,
  },
  {
    id: 4,
    category: "Educational Programs",
    title: "Tutor",
    organization: "Darul Uloom Institute",
    description:
      "Provide one-on-one or small group tutoring to students in various subjects, including Quranic studies and academic subjects.",
    location: "Remote",
    timeCommitment: "6-10 hours/week",
    skillLevel: "Advanced",
    skills: ["Tutoring", "Quranic Studies", "Mathematics"],
    urgency: "medium",
    spotsAvailable: 12,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDFA3La12Ox36ChuanS7t6aPHUxkyqRf5qRvte1OvAKzU1tX6QzLYqKFimvS-gkNYqreQUYlTFieaRhQDYcUnHQqyg1v_vfgOGtgMoKoPMOOrpOgd3EI9ceq1Uimqs8ZYOnqnwRjiqDlcA5zHxQQuFprRqaI_gg5aSgGPgI4ZlGCWoYK2LQNzGr3GEbBNkcrJlUbvfCsTAQgcRVaDNZLV5iRbIV6mbOtjk5q-lJf_Q2O4hwtPhkiN-aRzfLnMH0pkRhT6qJQZSP1m0",
    remote: true,
  },
  {
    id: 5,
    category: "Community Outreach",
    title: "Outreach Coordinator",
    organization: "Muslim Community Services",
    description:
      "Help organize and participate in community outreach activities, such as food drives, charity events, and interfaith dialogues.",
    location: "Multiple Locations",
    timeCommitment: "12-20 hours/week",
    skillLevel: "Intermediate",
    skills: ["Community Outreach", "Event Planning", "Public Speaking"],
    urgency: "high",
    spotsAvailable: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtmXoDR0hrFKpLpc3jGMMqGDnrqFk9d7AAAQica0RYcplLboHDH70_wTdI_6Y2TAYKnP4uVJaOx72O7RcRrXX8rmqYxKwgiFswvMe1TXzEQ-ZuGbER4Km_56_vglKyxNGpsbKxYPI1daIo3BjZpFfP90z_KZweiPMsLRSZUJZnHPwkX7KZ82tL8zxvg1eIf4qIhauvDXwhnOr6HR7Rlkkn0Ge9Ms1-y8VfhjbEPUsN4Xz14mHN-16lEukWfFN3FxSPQMSrF15PrOE",
    remote: false,
  },
  {
    id: 6,
    category: "Community Outreach",
    title: "Volunteer Driver",
    organization: "Islamic Relief Organization",
    description:
      "Assist in transporting goods, supplies, or individuals to and from community events and service locations.",
    location: "Various",
    timeCommitment: "4-8 hours/week",
    skillLevel: "Beginner",
    skills: ["Driving", "Customer Service", "Reliability"],
    urgency: "low",
    spotsAvailable: 15,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9_S6337RKl_zBI14Sb-l0WXgB8RSWtK_tQ7VUyRIhV1YYge3ZcYs5N-zRJnOq2a30OruCTRAthLE94Ykg-aO0zFbQZIfms-RNBSLujT7YQ9l8VNiZFqKAuMLh_0zuHaT1rzPLe3ll9WdOI17zem-XRtMGyqVWEMovO-LK8t50y8io6s6R6P4QsYTeCPvjGt8ZJAPwCv113SsweBm3j8jC4xhcLZGMnlKzVMspKKmaVQBQNgdjWidYtEuKbtLCwy8AiYUHQEHuVpY",
    remote: false,
  },
];

// ============= LOADING COMPONENTS =============
const VolunteerCardSkeleton = () => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 animate-pulse">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-80 h-48 bg-slate-200 rounded-xl flex-shrink-0"></div>
      <div className="flex-grow space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
        <div className="h-16 bg-slate-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded w-20"></div>
          <div className="h-6 bg-slate-200 rounded w-24"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

// ============= REUSABLE UI COMPONENTS =============
const CustomSelect = ({ label, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 flex items-center justify-between hover:border-slate-300 hover:shadow-md"
        >
          <span
            className={value === "All" ? "text-slate-500" : "text-slate-900"}
          >
            {value === "All" ? placeholder || "Select..." : value}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150 ${
                  index === 0 ? "rounded-t-xl" : ""
                } ${index === options.length - 1 ? "rounded-b-xl" : ""} ${
                  value === option
                    ? "bg-teal-50 text-teal-700 font-medium border-r-2 border-teal-500"
                    : "text-slate-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchBar = ({ value, onChange, placeholder }) => (
  <div className="relative mb-6">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
    />
  </div>
);

// ============= VOLUNTEER CARD COMPONENT =============
const VolunteerCard = ({ opportunity, onApply }) => {
  const [isHovered, setIsHovered] = useState(false);

  const urgencyColors = {
    high: "bg-rose-100 text-rose-700 border-rose-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  const skillLevelColors = {
    Beginner: "bg-blue-100 text-blue-700",
    Intermediate: "bg-purple-100 text-purple-700",
    Advanced: "bg-rose-100 text-rose-700",
  };

  return (
    <div
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 hover:shadow-2xl hover:border-teal-200/80 transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <div className="relative w-full lg:w-80 h-[270px] sm:h-[300px] lg:h-[270px] rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={opportunity.image}
            alt={opportunity.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {opportunity.remote && (
            <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs px-2 py-1 rounded-full font-medium">
              Remote
            </div>
          )}
          <div
            className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-full border font-medium ${
              urgencyColors[opportunity.urgency]
            }`}
          >
            {opportunity.urgency.charAt(0).toUpperCase() +
              opportunity.urgency.slice(1)}{" "}
            Priority
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-4">
          <div>
            <p className="text-slate-600 text-sm font-medium mb-1">
              {opportunity.organization}
            </p>
            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors duration-300">
              {opportunity.title}
            </h3>
            <p className="text-slate-600 leading-relaxed line-clamp-3">
              {opportunity.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1 text-slate-600">
              <MapPin className="w-4 h-4 text-teal-600" />
              {opportunity.location}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-4 h-4 text-teal-600" />
              {opportunity.timeCommitment}
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Users className="w-4 h-4 text-teal-600" />
              {opportunity.spotsAvailable} spots
            </div>
          </div>

          {/* Skills and Level */}
          <div className="flex flex-wrap gap-2">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                skillLevelColors[opportunity.skillLevel]
              }`}
            >
              {opportunity.skillLevel}
            </span>
            {opportunity.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApply(opportunity)}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 group/btn shadow-lg"
          >
            Apply Now
            <ArrowRight
              className={`w-4 h-4 transition-transform duration-300 ${
                isHovered ? "translate-x-1" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============= FILTERS COMPONENT =============
const AdvancedFilters = ({ filters, onFilterChange, opportunitiesCount }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filterOptions = {
    categories: [
      "All",
      "Mosque Events",
      "Educational Programs",
      "Community Outreach",
    ],
    locations: [
      "All",
      "Al-Madinah",
      "Al-Noor",
      "Al-Falah",
      "Remote",
      "Multiple Locations",
      "Various",
    ],
    skills: [
      "All",
      "Event Planning",
      "Teaching",
      "Driving",
      "Arabic",
      "Customer Service",
    ],
    timeCommitments: [
      "All",
      "4-8 hours/week",
      "5-8 hours/week",
      "6-10 hours/week",
      "8-12 hours/week",
      "10-15 hours/week",
      "12-20 hours/week",
    ],
    skillLevels: ["All", "Beginner", "Intermediate", "Advanced"],
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm relative z-20 rounded-2xl p-6 shadow-lg border border-slate-200/60">
      {/* Search Bar */}
      <SearchBar
        value={filters.search}
        onChange={(value) => onFilterChange({ ...filters, search: value })}
        placeholder="Search volunteer opportunities, skills, or organizations..."
      />

      {/* Filter Toggle */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-colors duration-300 mb-4"
      >
        <Filter className="w-4 h-4" />
        Advanced Filters
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isFilterOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Results Count */}
      <div className="mb-4 text-sm text-slate-600">
        Showing {opportunitiesCount} opportunities
      </div>

      {/* Filters Grid */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-slate-200">
          <CustomSelect
            label="Category"
            value={filters.category}
            onChange={(value) =>
              onFilterChange({ ...filters, category: value })
            }
            options={filterOptions.categories}
            placeholder="Select category"
          />

          <CustomSelect
            label="Location"
            value={filters.location}
            onChange={(value) =>
              onFilterChange({ ...filters, location: value })
            }
            options={filterOptions.locations}
            placeholder="Select location"
          />

          <CustomSelect
            label="Skills"
            value={filters.skills}
            onChange={(value) => onFilterChange({ ...filters, skills: value })}
            options={filterOptions.skills}
            placeholder="Select skills"
          />

          <CustomSelect
            label="Time Commitment"
            value={filters.timeCommitment}
            onChange={(value) =>
              onFilterChange({ ...filters, timeCommitment: value })
            }
            options={filterOptions.timeCommitments}
            placeholder="Select time"
          />

          <CustomSelect
            label="Skill Level"
            value={filters.skillLevel}
            onChange={(value) =>
              onFilterChange({ ...filters, skillLevel: value })
            }
            options={filterOptions.skillLevels}
            placeholder="Select level"
          />
        </div>
      )}
    </div>
  );
};

// ============= APPLICATION MODAL COMPONENT =============
const ApplicationModal = ({ opportunity, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    availability: "",
    experience: "",
    motivation: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      availability: "",
      experience: "",
      motivation: "",
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!isOpen || !opportunity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Apply for {opportunity.title}
            </h2>
            <p className="text-slate-600">{opportunity.organization}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-slate-600">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-teal-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Personal Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Step 2: Availability & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Availability & Experience
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Availability *
                </label>
                <select
                  required
                  value={formData.availability}
                  onChange={(e) =>
                    handleInputChange("availability", e.target.value)
                  }
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">Select your availability</option>
                  <option value="weekdays">Weekdays</option>
                  <option value="weekends">Weekends</option>
                  <option value="evenings">Evenings</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  rows={4}
                  placeholder="Tell us about any relevant experience you have..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}

          {/* Step 3: Motivation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">
                Your Motivation
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Why do you want to volunteer for this role? *
                </label>
                <textarea
                  required
                  value={formData.motivation}
                  onChange={(e) =>
                    handleInputChange("motivation", e.target.value)
                  }
                  rows={6}
                  placeholder="Share your motivation and what you hope to contribute..."
                  className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Summary */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-medium text-slate-800 mb-2">
                  Application Summary
                </h4>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>
                    <strong>Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Availability:</strong> {formData.availability}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Thank You */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="w-full h-[40vh] flex flex-col justify-center items-center gap-5">
                <CheckCircle
                  size={"6em"}
                  className="text-white bg-gradient-to-tr from-green-300 via-green-600 to-green-300 rounded-full p-3"
                />
                <p className="text-green-600 font-bold">
                  Thank You for your Application
                </p>
                <button className="font-bold text-white bg-red-600 py-2 px-3 rounded-lg">
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {currentStep !== totalSteps && (
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors duration-300"
                >
                  Previous
                </button>
              )}

              <div className="ml-auto">
                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
                  >
                    Submit Application
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// ============= HERO SECTION COMPONENT =============
const HeroSection = () => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
      <TrendingUp className="w-4 h-4" />
      Join Our Growing Community
    </div>
    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-emerald-600 bg-clip-text text-transparent mb-6">
      Volunteer Board
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
      Discover meaningful opportunities to contribute to our community's growth
      and well-being. Every small act of service creates lasting impact.
    </p>
  </div>
);

// ============= OPPORTUNITIES SECTION COMPONENT =============
const OpportunitiesSection = ({ groupedOpportunities, onApply, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <div className="h-8 bg-slate-200 rounded w-64 mb-8 animate-pulse"></div>
            <div className="space-y-6">
              {[1, 2].map((card) => (
                <VolunteerCardSkeleton key={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedOpportunities).map(([category, opportunities]) => (
        <section key={category} className="scroll-mt-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-800">{category}</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
            <span className="text-slate-500 text-sm font-medium">
              {opportunities.length}{" "}
              {opportunities.length === 1 ? "opportunity" : "opportunities"}
            </span>
          </div>

          <div className="space-y-6">
            {opportunities.map((opportunity) => (
              <VolunteerCard
                key={opportunity.id}
                opportunity={opportunity}
                onApply={onApply}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

// ============= NO RESULTS COMPONENT =============
const NoResults = ({ onClearFilters }) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-xl font-semibold text-slate-800 mb-2">
      No opportunities found
    </h3>
    <p className="text-slate-600 mb-6">
      Try adjusting your filters or search terms
    </p>
    <button
      onClick={onClearFilters}
      className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300"
    >
      Clear All Filters
    </button>
  </div>
);

// ============= CALL TO ACTION COMPONENT =============
const CallToAction = () => (
  <div className="mt-20 text-center bg-gradient-to-r from-teal-600/10 via-emerald-600/10 to-blue-600/10 rounded-3xl p-12">
    <h2 className="text-3xl font-bold text-slate-800 mb-4">
      Can't find the right opportunity?
    </h2>
    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
      We're always looking for passionate volunteers. Share your skills and
      interests with us.
    </p>
    <button className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
      Contact Us
      <ArrowRight className="w-5 h-5" />
    </button>
  </div>
);

// ============= BACKGROUND PATTERN COMPONENT =============
const BackgroundPattern = () => (
  <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="islamic-pattern"
          x="0"
          y="0"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
            fill="currentColor"
            className="text-teal-600"
          />
          <polygon
            points="50,20 73.3,35 73.3,65 50,80 26.7,65 26.7,35"
            fill="white"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  </div>
);

// ============= MAIN VOLUNTEER BOARD COMPONENT =============
const VolunteerBoard = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    location: "All",
    skills: "All",
    timeCommitment: "All",
    skillLevel: "All",
  });

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter opportunities
  const filteredOpportunities = useMemo(() => {
    return volunteerOpportunities.filter((opportunity) => {
      const matchesSearch =
        filters.search === "" ||
        opportunity.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        );

      const matchesCategory =
        filters.category === "All" || opportunity.category === filters.category;
      const matchesLocation =
        filters.location === "All" || opportunity.location === filters.location;
      const matchesSkills =
        filters.skills === "All" || opportunity.skills.includes(filters.skills);
      const matchesTimeCommitment =
        filters.timeCommitment === "All" ||
        opportunity.timeCommitment === filters.timeCommitment;
      const matchesSkillLevel =
        filters.skillLevel === "All" ||
        opportunity.skillLevel === filters.skillLevel;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesSkills &&
        matchesTimeCommitment &&
        matchesSkillLevel
      );
    });
  }, [filters]);

  // Group opportunities by category
  const groupedOpportunities = useMemo(() => {
    return filteredOpportunities.reduce((acc, opportunity) => {
      if (!acc[opportunity.category]) {
        acc[opportunity.category] = [];
      }
      acc[opportunity.category].push(opportunity);
      return acc;
    }, {});
  }, [filteredOpportunities]);

  const handleApply = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsApplicationModalOpen(true);
  };

  const handleSubmitApplication = (formData) => {
    // Simulate API call
    console.log(
      "Application submitted:",
      formData,
      "for",
      selectedOpportunity.title
    );
    setIsApplicationModalOpen(false);
    setSelectedOpportunity(null);
    // You could add a success toast here
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "All",
      location: "All",
      skills: "All",
      timeCommitment: "All",
      skillLevel: "All",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <BackgroundPattern />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <HeroSection />

          <AdvancedFilters
            filters={filters}
            onFilterChange={setFilters}
            opportunitiesCount={filteredOpportunities.length}
          />

          <div className="mt-12 space-y-16">
            {!isLoading && filteredOpportunities.length === 0 ? (
              <NoResults onClearFilters={handleClearFilters} />
            ) : (
              <OpportunitiesSection
                groupedOpportunities={groupedOpportunities}
                onApply={handleApply}
                isLoading={isLoading}
              />
            )}

            {!isLoading && filteredOpportunities.length > 0 && <CallToAction />}
          </div>
        </div>
      </main>

      <ApplicationModal
        opportunity={selectedOpportunity}
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedOpportunity(null);
        }}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
};

export default VolunteerBoard;
