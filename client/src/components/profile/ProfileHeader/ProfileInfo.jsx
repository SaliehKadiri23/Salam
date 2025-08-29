import React from 'react';
import { Calendar, MapPin, Shield } from 'lucide-react';

const ProfileInfo = ({ 
  name, 
  username, 
  joinDate, 
  membershipLevel, 
  location 
}) => {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const getMembershipBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'active member':
        return 'bg-islamic-100 text-islamic-700 border-islamic-200';
      case 'premium member':
        return 'bg-gold-100 text-gold-700 border-gold-200';
      case 'moderator':
        return 'bg-islamic-purple-100 text-islamic-purple-700 border-islamic-purple-200';
      default:
        return 'bg-white/20 text-white border-white/30';
    }
  };

  return (
    <div className="flex-grow text-center md:text-left space-y-3">
      {/* Name and Username */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">
          {name}
        </h1>
        <p className="text-xl text-white/80">
          @{username}
        </p>
      </div>

      {/* Member Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-white/90">
        
        {/* Join Date */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4" />
          <span>Joined {formatJoinDate(joinDate)}</span>
        </div>

        <span className="hidden md:block text-white/50">•</span>

        {/* Location */}
        {location && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
            <span className="hidden md:block text-white/50">•</span>
          </>
        )}

        {/* Membership Level */}
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          <span 
            className={`
              px-3 py-1 
              rounded-full 
              text-xs 
              font-medium 
              border
              ${getMembershipBadgeColor(membershipLevel)}
              transition-all 
              duration-200
            `}
          >
            {membershipLevel}
          </span>
        </div>
      </div>

      {/* Bio Preview  */}
      <div className="text-white/80 text-sm max-w-md">
        <p className="line-clamp-2">
          Seeking knowledge and serving the community. May Allah guide us all on the straight path.
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;