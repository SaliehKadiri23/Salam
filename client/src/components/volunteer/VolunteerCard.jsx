import React, { useState } from 'react';
import { MapPin, Clock, Users, ArrowRight, Medal } from 'lucide-react';

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
      className="group bg-white/80 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 dark:border-emerald-600 hover:shadow-2xl hover:border-teal-200/80 transition-all duration-500 hover:-translate-y-1"
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
            <p className="text-slate-600 dark:text-gray-50 text-sm font-medium mb-1">
              {opportunity.organization}
            </p>
            <h3 className="text-xl font-bold text-slate-800 dark:text-gray-100 mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors duration-300">
              {opportunity.title}
            </h3>
            <p className="text-slate-600 dark:text-gray-100 leading-relaxed line-clamp-3">
              {opportunity.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1 text-slate-600 dark:text-gray-100">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {opportunity.location}
            </div>
            <div className="flex items-center gap-1 text-slate-600 dark:text-gray-100">
              <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              {opportunity.timeCommitment}
            </div>
            <div className="flex items-center gap-1 text-slate-600 dark:text-gray-100">
              <Medal className="w-4 h-4 text-teal-600 dark:text-teal-400" />
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

export default VolunteerCard;