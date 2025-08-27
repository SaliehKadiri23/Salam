import React from "react";
import { Users, Heart, Shield, Stars } from "lucide-react";
import FormField from "../../utility/FormField";

const CommunitySection = ({ formData, onInputChange }) => {
  const interestOptions = [
    "Quran Studies",
    "Hadith",
    "Fiqh",
    "Arabic Language",
    "Islamic History",
    "Community Service",
    "Youth Programs",
    "Education",
    "Charity Work",
    "Sports",
    "Technology",
    "Arts & Culture",
    "Dawah",
    "Interfaith Dialogue",
  ];

  const communityRoles = [
    { value: "member", label: "Member" },
    { value: "volunteer", label: "Volunteer" },
    { value: "organizer", label: "Event Organizer" },
    { value: "teacher", label: "Teacher/Mentor" },
    { value: "scholar", label: "Islamic Scholar" },
    { value: "moderator", label: "Community Moderator" },
  ];

  const handleInterestToggle = (interest) => {
    const currentInterests = formData.interests || [];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((item) => item !== interest)
      : [...currentInterests, interest];
    onInputChange("interests", updatedInterests);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-emerald-600 pb-2">
        <Stars className="w-5 h-5 text-islamic-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Community Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Interests */}
        <FormField
          label="Interests & Areas of Focus"
          helper="Select topics you're passionate about or want to learn more about"
          useFormik={false}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {interestOptions.map((interest) => {
              const isSelected = (formData.interests || []).includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-left
                    ${
                      isSelected
                        ? "bg-islamic-purple-500 text-white shadow-md transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Heart
                      className={`w-3 h-3 ${isSelected ? "fill-current" : ""}`}
                    />
                    {interest}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-100 mt-2 flex items-center gap-2">
            <span>Selected: {(formData.interests || []).length} interests</span>
            {(formData.interests || []).length >= 5 && (
              <span className="text-islamic-600 font-medium">
                Great variety! 🌟
              </span>
            )}
          </div>
        </FormField>

        {/* Community Role */}
        <FormField
          label="Community Role"
          helper="How do you contribute to the community?"
          useFormik={false}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {communityRoles.map((role) => {
              const isSelected = formData.communityRole === role.value;
              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => onInputChange("communityRole", role.value)}
                  className={`
                    p-4 rounded-xl border-2 dark:text-gray-100 transition-all duration-200 text-left group
                    ${
                      isSelected
                        ? "border-islamic-500 bg-islamic-50 dark:bg-islamic-200 shadow-md transform scale-105"
                        : "border-gray-200 dark:border-emerald-600 hover:border-islamic-300 hover:bg-islamic-50/30 hover:shadow-sm"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Shield
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isSelected
                          ? "text-islamic-600"
                          : "text-gray-400 dark:text-gray-100 group-hover:text-islamic-500"
                      }`}
                    />
                    <div>
                      <div
                        className={`font-medium transition-colors duration-200 ${
                          isSelected
                            ? "text-islamic-700"
                            : "text-gray-900 dark:text-gray-100 group-hover:text-islamic-600"
                        }`}
                      >
                        {role.label}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          {formData.communityRole && (
            <div className="mt-2 text-sm text-islamic-600 font-medium">
              ✓ Selected:{" "}
              {
                communityRoles.find((r) => r.value === formData.communityRole)
                  ?.label
              }
            </div>
          )}
        </FormField>

        {/* Availability for Community Service */}
        <FormField
          label="Availability for Community Service"
          helper="How often can you contribute to community activities?"
          useFormik={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { value: "weekly", label: "Weekly", desc: "Very active" },
              {
                value: "monthly",
                label: "Monthly",
                desc: "Regular contributor",
              },
              {
                value: "occasionally",
                label: "Occasionally",
                desc: "When possible",
              },
            ].map((option) => {
              const isSelected = formData.availability === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onInputChange("availability", option.value)}
                  className={`
                    p-4 rounded-xl group border-2 transition-all duration-200 text-left
                    ${
                      isSelected
                        ? "border-islamic-500 bg-islamic-50 dark:bg-islamic-700 shadow-md"
                        : "border-gray-200 dark:border-emerald-600 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500"
                    }
                  `}
                >
                  <div
                    className={`font-medium ${
                      isSelected
                        ? "text-islamic-700 dark:text-gray-100"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {option.label}
                  </div>
                  <div
                    className={`text-sm text-gray-800 dark:text-gray-200 mt-1 `}
                  >
                    {option.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default CommunitySection;
