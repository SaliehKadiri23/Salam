import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PageHeader from '../components/resources/PageHeader';
import SearchAndFilters from '../components/resources/SearchAndFilters';
import ResultsHeader from '../components/resources/ResultsHeader';
import ResourcesGrid from '../components/resources/ResourcesGrid';
import ResourceDetailView from '../components/resources/ResourceDetailView';
import EmptyState from '../components/resources/EmptyState';

const Resources = () => {
  const { currentView } = useSelector((state) => state.ui);
  const { all, searchQuery, selectedCategory, selectedType } = useSelector(
    (state) => state.resources
  );
  const { completedItems, bookmarkedItems, progressItems } = useSelector(
    (state) => state.user
  );

  const filteredResources = useMemo(() => {
    return all.filter((resource) => {
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
  }, [all, searchQuery, selectedCategory, selectedType]);

  const userStats = {
    totalCompleted: completedItems.length,
    totalBookmarked: bookmarkedItems.length,
    totalInProgress: Object.values(progressItems).filter(
      (progress) => progress < 100
    ).length,
    totalTimeSpent: completedItems.reduce((total, id) => {
      const resource = all.find((r) => r.id === id);
      return total + (resource?.estimatedTime || 0);
    }, 0),
  };

  if (currentView === 'detail') {
    return <ResourceDetailView />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
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
