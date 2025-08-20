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

        {/* Quick Stats Preview (Optional) */}
        <div className="text-center text-white/80 text-xs space-y-1">
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

  // Actions for viewing other user's profile
  return (
    <div className="flex flex-col gap-3 items-center md:items-end">
      <div className="flex gap-2">
        <Button
          onClick={handleMessage}
          variant="secondary"
          size="sm"
          className="
            bg-white/20 
            hover:bg-white/30 
            text-white 
            border-white/30 
            hover:border-white/50
            backdrop-blur-sm
          "
        >
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>

        <Button
          onClick={handleFollow}
          variant="primary"
          size="sm"
          className="
            bg-islamic-400 
            hover:bg-islamic-500 
            text-white
            shadow-lg
          "
        >
          <UserPlus className="w-4 h-4" />
          Follow
        </Button>

        <Button
          onClick={handleMore}
          variant="secondary"
          size="sm"
          className="
            bg-white/20 
            hover:bg-white/30 
            text-white 
            border-white/30 
            hover:border-white/50
            backdrop-blur-sm
          "
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Connection Status */}
      <div className="text-center text-white/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Connected</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;