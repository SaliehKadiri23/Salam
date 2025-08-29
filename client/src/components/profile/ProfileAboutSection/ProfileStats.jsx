import React from 'react';
import { MessageSquare, Heart, Users, TrendingUp, Stars } from 'lucide-react';
import GlassmorphicCard from '../../shared/GlassmorphicCard';
import AnimatedCounter from '../../utility/AnimatedCounter';

const ProfileStats = ({ stats }) => {
  const getIcon = (iconName) => {
    const icons = {
      MessageSquare: MessageSquare,
      Heart: Heart,
      Users: Stars,
      TrendingUp: TrendingUp
    };
    
    const IconComponent = icons[iconName] || MessageSquare;
    return <IconComponent className="w-6 h-6" />;
  };

  const getColorClasses = (color) => {
    const colors = {
      islamic: {
        icon: 'text-islamic-500',
        bg: 'bg-islamic-50',
        border: 'border-islamic-200',
        hover: 'hover:bg-islamic-100',
        gradient: 'from-islamic-400 to-islamic-600'
      },
      gold: {
        icon: 'text-gold-500',
        bg: 'bg-gold-50',
        border: 'border-gold-200',
        hover: 'hover:bg-gold-100',
        gradient: 'from-gold-400 to-gold-600'
      },
      'islamic-teal': {
        icon: 'text-islamic-teal-500',
        bg: 'bg-islamic-teal-50',
        border: 'border-islamic-teal-200',
        hover: 'hover:bg-islamic-teal-100',
        gradient: 'from-islamic-teal-400 to-islamic-teal-600'
      }
    };
    
    return colors[color] || colors.islamic;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <GlassmorphicCard
            key={index}
            className="
              group 
              hover:scale-105
              transition-all 
              duration-300
              hover:shadow-lg
              border
              border-gray-100
              hover:border-gray-200
            "
          >
            <div className="text-center space-y-4">
              {/* Icon */}
              <div
                className={`
                inline-flex 
                items-center 
                justify-center 
                w-16 
                h-16 
                rounded-2xl 
                ${colorClasses.bg}
                ${colorClasses.hover}
                border-2
                ${colorClasses.border}
                group-hover:shadow-md
                transition-all 
                duration-300
                ${colorClasses.icon}
              `}
              >
                {getIcon(stat.icon)}
              </div>

              {/* Value */}
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter target={stat.value} duration={2000} />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-1">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {stat.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`
                    bg-gradient-to-r 
                    ${colorClasses.gradient}
                    h-full 
                    rounded-full 
                    transition-all 
                    duration-1000 
                    ease-out
                  `}
                  style={{
                    width: `${Math.min((stat.value / 100) * 100, 100)}%`,
                  }}
                />
              </div>

              {/* Trend Indicator */}
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-100">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span>+12% this month</span>
              </div>
            </div>
          </GlassmorphicCard>
        );
      })}
    </div>
  );
};

export default ProfileStats;