import React from 'react';

const LoadingSkeleton = ({ 
  className = '', 
  variant = 'default',
  count = 1,
  height = 'h-4',
  width = 'w-full'
}) => {
  const variants = {
    default: 'bg-gray-200 rounded',
    avatar: 'bg-gray-200 rounded-full',
    card: 'bg-gray-200 rounded-lg',
    text: 'bg-gray-200 rounded h-4',
    title: 'bg-gray-200 rounded h-6',
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`
        animate-pulse
        ${variants[variant]}
        ${height}
        ${width}
        ${className}
      `}
    />
  ));

  return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>;
};

// Specific skeleton components for common use cases
export const ProfileHeaderSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex flex-col items-center gap-6 md:flex-row p-8">
      <LoadingSkeleton variant="avatar" width="w-32" height="h-32" />
      <div className="flex-grow space-y-4">
        <LoadingSkeleton variant="title" width="w-48" />
        <LoadingSkeleton variant="text" width="w-32" />
        <LoadingSkeleton variant="text" width="w-64" />
      </div>
      <div className="space-y-2">
        <LoadingSkeleton variant="card" width="w-32" height="h-10" />
      </div>
    </div>
  </div>
);

export const ProfileCardSkeleton = () => (
  <div className="animate-pulse p-6 space-y-4">
    <LoadingSkeleton variant="title" width="w-32" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <LoadingSkeleton variant="text" width="w-24" height="h-3" />
          <LoadingSkeleton variant="text" width="w-40" />
        </div>
      ))}
    </div>
  </div>
);

export const StatCardSkeleton = () => (
  <div className="animate-pulse p-6 text-center space-y-2">
    <LoadingSkeleton variant="default" width="w-12" height="h-12" className="mx-auto" />
    <LoadingSkeleton variant="title" width="w-16" className="mx-auto" />
    <LoadingSkeleton variant="text" width="w-20" className="mx-auto" />
  </div>
);

export default LoadingSkeleton;