import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useGetResourcesQuery } from '../services/apiSlice';
import PageHeader from '../components/resources/PageHeader';
import SearchAndFilters from '../components/resources/SearchAndFilters';
import ResultsHeader from '../components/resources/ResultsHeader';
import ResourcesGrid from '../components/resources/ResourcesGrid';
import ResourceDetailView from '../components/resources/ResourceDetailView';
import EmptyState from '../components/resources/EmptyState';
import {motion} from "framer-motion";

const Resources = () => {
  const { currentView } = useSelector((state) => state.ui);
  const { searchQuery, selectedCategory, selectedType } = useSelector(
    (state) => state.resources
  );
  const { completedItems, bookmarkedItems, progressItems } = useSelector(
    (state) => state.user
  );
  
  const { data: resourcesData, isLoading, isError, error } = useGetResourcesQuery();
  const allResources = resourcesData?.data || [];

  const filteredResources = useMemo(() => {
    return allResources.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        resource.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || resource.category === selectedCategory;
      const matchesType =
        selectedType === 'all' || resource.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [allResources, searchQuery, selectedCategory, selectedType]);

  const userStats = {
    totalCompleted: completedItems.length,
    totalBookmarked: bookmarkedItems.length,
    totalInProgress: Object.values(progressItems).filter(
      (progress) => progress < 100
    ).length,
    totalTimeSpent: completedItems.reduce((total, id) => {
      const resource = allResources.find((r) => r.id === id);
      return total + (resource?.estimatedTime || 0);
    }, 0),
  };

  if (currentView === 'detail') {
    return <ResourceDetailView />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-black/40 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-500 p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error Loading Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {error?.data?.message || "An error occurred while loading resources."}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader userStats={userStats} />
        <SearchAndFilters />
        <ResultsHeader resultCount={filteredResources.length} />
        <ResourcesGrid resources={filteredResources} />
        {filteredResources.length === 0 && <EmptyState />}
      </main>
    </div>
  );
};

export default Resources;
