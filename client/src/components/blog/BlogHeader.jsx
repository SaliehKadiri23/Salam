import React from 'react';

const BlogHeader = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 py-2 to-emerald-600 dark:from-green-500 dark:to-emerald-500 bg-clip-text text-transparent">
        Articles & Insights
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
        Explore our collection of articles on Islam, culture, lifestyle, and
        community. Discover wisdom, inspiration, and guidance for modern Muslim
        living.
      </p>
    </div>
  );
};

export default BlogHeader;