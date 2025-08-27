import React from 'react';
import { 
  User, 
  MapPin, 
  Heart, 
  Globe, 
  Shield, 
  Calendar, 
  Star,
  BookOpen,
  Coffee,
  Stars
} from 'lucide-react';

const ProfileDetailsGrid = ({ details }) => {
  const getIcon = (iconName) => {
    const icons = {
      User: Stars,
      MapPin: MapPin,
      Heart: Heart,
      Globe: Globe,
      Shield: Shield,
      Calendar: Calendar,
      Star: Star,
      BookOpen: BookOpen,
      Coffee: Coffee
    };
    
    const IconComponent = icons[iconName] || User;
    return <IconComponent className="w-5 h-5" />;
  };

  const getIconColor = (iconName) => {
    const colors = {
      User: 'text-islamic-500',
      MapPin: 'text-islamic-teal-500',
      Heart: 'text-red-500',
      Globe: 'text-blue-500',
      Shield: 'text-islamic-purple-500',
      Calendar: 'text-gold-500',
      Star: 'text-yellow-500',
      BookOpen: 'text-indigo-500',
      Coffee: 'text-amber-500'
    };
    
    return colors[iconName] || 'text-gray-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {details.map((detail, index) => (
        <div
          key={index}
          className="
            group
            p-4 
            rounded-xl 
            border 
            border-gray-100 
            dark:border-emerald-600
            hover:border-islamic-200
            hover:shadow-sm
            transition-all 
            duration-300
            hover:bg-islamic-50/30
          "
        >
          <div className="flex items-start gap-3">
            <div
              className={`
              p-2 
              rounded-lg 
              bg-gray-50 
              group-hover:bg-white
              transition-all 
              duration-300
              ${getIconColor(detail.icon)}
            `}
            >
              {getIcon(detail.icon)}
            </div>

            <div className="flex-grow min-w-0">
              <h3
                className="
                text-sm 
                font-medium 
                text-gray-500
                dark:text-gray-100 
                mb-1
                group-hover:text-islamic-600
                dark:group-hover:text-islamic-400
                transition-colors
                duration-300
              "
              >
                {detail.label}
              </h3>
              <p
                className="
                text-base 
                font-medium 
                text-gray-900 
                dark:text-gray-200
                break-words
                group-hover:text-islamic-700
                dark:group-hover:text-islamic-500
                transition-colors
                duration-300
              "
              >
                {detail.value || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileDetailsGrid;