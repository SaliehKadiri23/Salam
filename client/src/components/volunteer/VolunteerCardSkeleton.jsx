import React from 'react';

const VolunteerCardSkeleton = () => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 animate-pulse">
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-80 h-48 bg-slate-200 rounded-xl flex-shrink-0"></div>
      <div className="flex-grow space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-6 bg-slate-200 rounded w-2/3"></div>
        <div className="h-16 bg-slate-200 rounded"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded w-20"></div>
          <div className="h-6 bg-slate-200 rounded w-24"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded w-32"></div>
      </div>
    </div>
  </div>
);

export default VolunteerCardSkeleton;