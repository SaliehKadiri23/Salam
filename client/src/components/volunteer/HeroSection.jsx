import React from 'react';
import { TrendingUp } from 'lucide-react';

const HeroSection = () => (
  <div className="text-center mb-16">
    <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
      <TrendingUp className="w-4 h-4" />
      Join Our Growing Community
    </div>
    <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-teal-700 to-emerald-600 bg-clip-text text-transparent mb-6">
      Volunteer Board
    </h1>
    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
      Discover meaningful opportunities to contribute to our community's growth
      and well-being. Every small act of service creates lasting impact.
    </p>
  </div>
);

export default HeroSection;