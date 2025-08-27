import React from 'react';
import { Edit2, MessageCircle, UserPlus, MoreHorizontal } from 'lucide-react';
import Button from '../../utility/Button';

const ProfileActions = ({ onEditClick, userId, isOwnProfile = true }) => {
  const handleMessage = () => {
    // Handle messaging functionality
    console.log('Send message to user:', userId);
  };

  const handleFollow = () => {
    // Handle follow functionality
    console.log('Follow user:', userId);
  };

  const handleMore = () => {
    // Handle more actions dropdown
    console.log('Show more actions for user:', userId);
  };

  if (isOwnProfile) {
    return (
      <div className="flex flex-col gap-3 items-center md:items-end">
        <Button
          onClick={onEditClick}
          variant="primary"
          size="md"
          className="
            bg-islamic-500
            hover:bg-islamic-600
            text-white
            border-islamic-500
            hover:border-islamic-600
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
            hover:shadow-xl
            focus-ring-islamic
          "
          aria-label="Edit your profile information"
        >
          <Edit2 className="w-4 h-4" aria-hidden="true" />
          Edit Profile
        </Button>

        {/* Quick Stats Preview */}
        <div className="text-center font-semibold text-gray-800 dark:text-white/80 mb-2 text-xs space-y-1">
          <div className="flex items-center gap-4">
            <div>
              <div className="font-semibold">120</div>
              <div>Posts</div>
            </div>
            <div>
              <div className="font-semibold">50</div>
              <div>Duas</div>
            </div>
            <div>
              <div className="font-semibold">30</div>
              <div>Hours</div>
            </div>
          </div>
        </div>
      </div>
    );
  }


};

export default ProfileActions;