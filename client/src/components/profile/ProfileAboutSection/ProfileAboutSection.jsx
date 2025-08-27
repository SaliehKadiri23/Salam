import React from 'react';
import GlassmorphicCard from '../../shared/GlassmorphicCard';
import ProfileDetailsGrid from './ProfileDetailsGrid';
import ProfileStats from './ProfileStats';

const ProfileAboutSection = ({ user }) => {
  const profileDetails = [
    {
      label: 'Preferred Name',
      value: user.preferredName,
      icon: 'Star'
    },
    {
      label: 'Location',
      value: user.location,
      icon: 'MapPin'
    },
    {
      label: 'Interests',
      value: user.interests.join(', '),
      icon: 'Heart'
    },
    {
      label: 'Languages',
      value: user.languages.join(', '),
      icon: 'Globe'
    },
    {
      label: 'Community Role',
      value: user.communityRole,
      icon: 'Shield'
    },
    {
      label: 'Member Since',
      value: new Date(user.joinDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
      }),
      icon: 'Calendar'
    }
  ];

  const stats = [
    {
      icon: 'MessageSquare',
      value: user.stats.forumPosts,
      label: 'Forum Posts',
      color: 'islamic',
      description: 'Community discussions'
    },
    {
      icon: 'Heart',
      value: user.stats.duaRequests,
      label: 'Dua Requests',
      color: 'gold',
      description: 'Prayers requested'
    },
    {
      icon: 'Users',
      value: user.stats.volunteerActivities,
      label: 'Volunteer Hours',
      color: 'islamic-teal',
      description: 'Community service'
    }
  ];

  return (
    <div className="space-y-6">
      {/* About Details */}
      <GlassmorphicCard>
        <div className="space-y-6">
          <div className="border-b border-gray-100 dark:border-emerald-600 pb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              About
            </h2>
            <p className="text-gray-600 dark:text-gray-200 ">
              {user.bio ||
                "Learn more about this community member's journey and interests."}
            </p>
          </div>

          <ProfileDetailsGrid details={profileDetails} />
        </div>
      </GlassmorphicCard>

      {/* Statistics */}
      <ProfileStats stats={stats} />
    </div>
  );
};

export default ProfileAboutSection;