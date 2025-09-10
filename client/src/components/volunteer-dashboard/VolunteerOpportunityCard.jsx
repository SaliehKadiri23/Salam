import React from 'react';
import { Edit, Trash2, MapPin, Clock, Users, Medal, Eye } from 'lucide-react';

const VolunteerOpportunityCard = ({ opportunity, onEdit, onDelete, onViewApplicants }) => {
  const urgencyColors = {
    high: "bg-rose-100 text-rose-800 border-rose-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    low: "bg-emerald-100 text-emerald-800 border-emerald-200",
  };

  const skillLevelColors = {
    Beginner: "bg-blue-100 text-blue-800",
    Intermediate: "bg-purple-100 text-purple-800",
    Advanced: "bg-rose-100 text-rose-800",
  };

  return (
    <div
    id={opportunity._id}
    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Image */}
          {opportunity.image && (
            <div className="flex-shrink-0 flex justify-center">
              <img
                src={opportunity.image}
                alt={opportunity.title}
                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {opportunity.organization}
                  </span>
                  {opportunity.remote && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      Remote
                    </span>
                  )}
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${urgencyColors[opportunity.urgency]}`}>
                    {opportunity.urgency.charAt(0).toUpperCase() + opportunity.urgency.slice(1)} Priority
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {opportunity.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {opportunity.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewApplicants(opportunity)}
                  className="px-3 mb-3 py-2 text-nowrap bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white text-sm font-medium rounded-lg shadow transition-all duration-200 flex items-center"
                  title="View Applicants"
                >
                  View Applications
                  <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                    {opportunity.applicationsCount || 0}
                  </span>
                </button>
                <button
                  onClick={() => onEdit(opportunity)}
                  className="p-2 text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Edit"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(opportunity._id)}
                  className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate">{opportunity.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="truncate">{opportunity.timeCommitment}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <Medal className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span>{opportunity.spotsAvailable} spots available</span>
              </div>
              <div className="flex items-center text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${skillLevelColors[opportunity.skillLevel]}`}>
                  {opportunity.skillLevel}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {opportunity.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerOpportunityCard;