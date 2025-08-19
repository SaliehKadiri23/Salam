import React from 'react';
import { Heart, Brain, TrendingUp, Users, Home, Stars } from 'lucide-react';

const CategoryBadge = ({ category }) => {
  // Category configurations with colors and icons
  const categoryConfig = {
    health: {
      label: 'Health',
      icon: Heart,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      borderColor: 'border-red-100',
    },
    guidance: {
      label: 'Guidance',
      icon: Brain,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-100',
    },
    success: {
      label: 'Success',
      icon: TrendingUp,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      borderColor: 'border-emerald-100',
    },
    family: {
      label: 'Family',
      icon: Home,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-100',
    },
    community: {
      label: 'Community',
      icon: Stars,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-100',
    },
  };

  const config = categoryConfig[category?.toLowerCase()] || categoryConfig.guidance;
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200
      ${config.bgColor} ${config.textColor} ${config.borderColor}
      hover:shadow-sm
    `}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export default CategoryBadge;