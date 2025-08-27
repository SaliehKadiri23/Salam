import React from "react";
import { User, Type, FileText, Star } from "lucide-react";
import FormField from "../../utility/FormField";

const BasicInfoSection = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-emerald-600 pb-2">
        <Star className="w-5 h-5 text-islamic-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Basic Information
        </h3>
      </div>

      <div className="space-y-4">
        {/* Preferred Name */}
        <FormField
          label="Preferred Name"
          helper="How you'd like to be addressed in the community"
          useFormik={false}
        >
          <div className="relative">
            <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-100" />
            <input
              type="text"
              value={formData.preferredName || ""}
              onChange={(e) => onInputChange("preferredName", e.target.value)}
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
              placeholder="Enter your preferred name"
              maxLength={50}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-100 text-right">
            {(formData.preferredName || "").length}/50
          </div>
        </FormField>

        {/* Bio */}
        <FormField
          label="Bio"
          helper="Tell the community a bit about yourself"
          useFormik={false}
        >
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400 dark:text-gray-100 " />
            <textarea
              value={formData.bio || ""}
              onChange={(e) => onInputChange("bio", e.target.value)}
              rows={4}
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
              placeholder="Share something about yourself, your interests, or your journey..."
              maxLength={500}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-100 text-right">
            {(formData.bio || "").length}/500
          </div>
        </FormField>
      </div>
    </div>
  );
};

export default BasicInfoSection;
