import React from 'react';
import { useSelector } from 'react-redux';
import ResourceCard from './ResourceCard';

const ResourcesGrid = ({ resources }) => {
  const { viewMode } = useSelector((state) => state.ui);

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
          : 'space-y-4 mb-12'
      }
    >
      {resources.map((resource) => (
        <ResourceCard key={resource._id} resource={resource} />
      ))}
    </div>
  );
};

export default ResourcesGrid;