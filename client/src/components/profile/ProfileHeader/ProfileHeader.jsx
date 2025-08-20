import React from 'react';
import { User, Calendar, MapPin, Shield } from 'lucide-react';
import ProfileActions from './ProfileActions';

const ProfileHeader = ({ user, onEditClick }) => {
  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg px-8 md:py-8 border border-gray-200">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
       

        {/* User Info */}
        <div className="flex-grow md:ml-8 text-center pt-8 md:pt-0 md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user.fullName}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            @{user.username}
          </p>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Joined {formatJoinDate(user.joinDate)}</span>
            </div>
            
            {user.location && (
              <>
                <span className="hidden md:block text-gray-300">•</span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
              </>
            )}
            
            <span className="hidden md:block text-gray-300">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="px-3 py-1 bg-islamic-100 text-islamic-700 rounded-full text-sm font-medium">
                {user.membershipLevel}
              </span>
            </div>
          </div>

          {user.bio && (
            <p className="mt-4 text-gray-700 max-w-md">
              {user.bio}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0">
          <ProfileActions 
            onEditClick={onEditClick}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;