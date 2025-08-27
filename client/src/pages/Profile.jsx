import React, { useState, useEffect } from 'react';
import { User, MapPin, Heart, MessageSquare, Users, Edit2, Calendar, Shield } from 'lucide-react';
import GlassmorphicCard from '../components/shared/GlassmorphicCard';
import IslamicPattern from '../components/utility/IslamicPattern';
import AnimatedCounter from '../components/utility/AnimatedCounter';
import { ProfileHeaderSkeleton, ProfileCardSkeleton, StatCardSkeleton } from '../components/shared/LoadingSkeleton';


import ProfileHeader from '../components/profile/ProfileHeader/ProfileHeader';
import ProfileAboutSection from '../components/profile/ProfileAboutSection/ProfileAboutSection';
import EditProfileModal from '../components/profile/EditProfileModal/EditProfileModal';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Mock user data
  const mockUserData = {
    id: "user123",
    username: "muhammad",
    preferredName: "Muhammad",
    fullName: "Muhammad Ahmad",
    email: "aisha@example.com",
    bio: "Seeking knowledge and serving the community. May Allah guide us all.",
    location: "Kano, Nigeria",
    joinDate: "2022-03-15",
    lastActive: "2024-01-15T10:30:00Z",
    isOnline: true,
    membershipLevel: "Active Member",
    interests: ["Reading", "Hiking", "Community Service", "Islamic Studies"],
    languages: ["English", "Arabic", "Urdu"],
    communityRole: "Volunteer",
    privacySettings: {
      profileVisibility: "community",
      showOnlineStatus: true,
      allowMessages: true
    },
    stats: {
      forumPosts: 120,
      duaRequests: 50,
      volunteerActivities: 30,
      communityImpact: 85
    },
    achievements: [
      { id: 1, name: "30-Day Prayer Streak", earned: true, date: "2024-01-01" },
      { id: 2, name: "Community Helper", earned: true, date: "2023-12-15" },
      { id: 3, name: "Quran Completion", earned: false, progress: 40 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchUserData = async () => {
      setLoading(true);
      // Simulate network delay
      setTimeout(() => {
        setUserData(mockUserData);
        setLoading(false);
      }, 1000);
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    setUserData({ ...userData, ...updatedData });
    setEditModalOpen(false);
    // In real app, this would make API call to save data
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div id="main-content" className="space-y-8">
            <GlassmorphicCard>
              <ProfileHeaderSkeleton />
            </GlassmorphicCard>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <GlassmorphicCard>
                  <ProfileCardSkeleton />
                </GlassmorphicCard>
              </div>
              <div className="space-y-6">
                <GlassmorphicCard>
                  <StatCardSkeleton />
                </GlassmorphicCard>
                <GlassmorphicCard>
                  <StatCardSkeleton />
                </GlassmorphicCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 relative overflow-hidden">
      {/* Background Islamic Pattern */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <IslamicPattern
          className="w-full h-full text-islamic-500"
          opacity="opacity-[0.02]"
          variant="geometric"
        />
      </div>

      <main
        className="relative z-10 container mx-auto px-4 py-4 sm:py-8 max-w-6xl"
        role="main"
        aria-label="User profile page"
      >
        {/* Skip to content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-islamic-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="animate-fade-in">
            <ProfileHeader user={userData} onEditClick={handleEditProfile} />
          </div>

          {/* About Section */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <ProfileAboutSection user={userData} />
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        userData={userData}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default ProfilePage;