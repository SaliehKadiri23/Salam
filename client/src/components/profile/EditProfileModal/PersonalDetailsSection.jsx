import React from "react";
import { MapPin, Globe } from "lucide-react";
import FormField from "../../utility/FormField";

const PersonalDetailsSection = ({ formData, onInputChange }) => {
  const languageOptions = [
    "Arabic",
    "English",
    "Urdu",
    "Turkish",
    "French",
    "Spanish",
    "Indonesian",
    "Malay",
    "Bengali",
    "Persian",
    "Hindi",
    "German",
  ];

  const handleLanguageToggle = (language) => {
    const currentLanguages = formData.languages || [];
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter((lang) => lang !== language)
      : [...currentLanguages, language];
    onInputChange("languages", updatedLanguages);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-emerald-600 pb-2">
        <Globe className="w-5 h-5 text-islamic-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Personal Details
        </h3>
      </div>

      <div className="space-y-4">
        {/* Location */}
        <FormField
          label="Location"
          helper="City and country where you're based"
          useFormik={false}
        >
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-100" />
            <input
              type="text"
              value={formData.location || ""}
              onChange={(e) => onInputChange("location", e.target.value)}
              className="
                w-full pl-10 pr-4 py-3 
                border border-gray-300 
                dark:border-emerald-600
                rounded-xl 
                focus:ring-2 
                focus:ring-islamic-500 
                focus:border-islamic-500
                transition-all
                duration-200
                outline-none
                dark:bg-black/40 
                dark:text-gray-100
              "
              placeholder="e.g., Toronto, Canada"
            />
          </div>
        </FormField>

        {/* Languages */}
        <FormField
          label="Languages Spoken"
          helper="Select all languages you can communicate in"
          useFormik={false}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {languageOptions.map((language) => {
              const isSelected = (formData.languages || []).includes(language);
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => handleLanguageToggle(language)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isSelected
                        ? "bg-islamic-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {language}
                </button>
              );
            })}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-100 mt-2">
            Selected: {(formData.languages || []).length} languages
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
