import React from 'react';
import { User, MapPin, Phone, Star } from 'lucide-react';

const ProfileForm = ({
  profileInfo,
  onProfileInfoChange
}) => {
  return (
    <>
      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Star className="w-5 h-5 text-gray-900" />
          </div>
          <input
            type="text"
            value={profileInfo.fullName}
            onChange={(e) => onProfileInfoChange('fullName', e.target.value)}
            className="w-full pl-12 pr-4 py-4 outline-none border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="Enter your full name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Location <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="w-5 h-5 text-gray-900" />
          </div>
          <input
            type="text"
            value={profileInfo.location}
            onChange={(e) => onProfileInfoChange('location', e.target.value)}
            className="w-full pl-12 pr-4 py-4 outline-none border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-gray-700 font-semibold text-sm">
          Phone Number (Optional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 outline-none flex items-center pointer-events-none">
            <Phone className="w-5 h-5 text-gray-900" />
          </div>
          <input
            type="tel"
            value={profileInfo.phone}
            onChange={(e) => onProfileInfoChange('phone', e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-islamic-500 focus:border-islamic-500 hover:border-islamic-300 bg-white/70 backdrop-blur-sm border-gray-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;