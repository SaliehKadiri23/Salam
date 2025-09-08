import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Eye, Filter, Search, RefreshCw } from 'lucide-react';
import { 
  useGetVolunteerOpportunitiesQuery, 
  useCreateVolunteerOpportunityMutation, 
  useUpdateVolunteerOpportunityMutation, 
  useDeleteVolunteerOpportunityMutation 
} from '../services/apiSlice';
import CustomSelect from '../components/volunteer-dashboard/CustomSelect';
import VolunteerOpportunityForm from '../components/volunteer-dashboard/VolunteerOpportunityForm';
import VolunteerOpportunityCard from '../components/volunteer-dashboard/VolunteerOpportunityCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorDisplay from '../components/common/ErrorDisplay';

const VolunteerOpportunitiesDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showInactive, setShowInactive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // RTK Query hooks
  const { data, error, isLoading, refetch } = useGetVolunteerOpportunitiesQuery();
  const [createOpportunity] = useCreateVolunteerOpportunityMutation();
  const [updateOpportunity] = useUpdateVolunteerOpportunityMutation();
  const [deleteOpportunity] = useDeleteVolunteerOpportunityMutation();

  const opportunities = data?.data || [];

  // Custom refetch with delay and promise-based toast notifications
  const delayedRefetch = async () => {
    setIsRefreshing(true);
    
    // Create a promise for the refetch operation
    const refetchPromise = new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          await refetch();
          resolve();
        } catch (error) {
          console.error('Error refreshing volunteer opportunities:', error);
          reject(error);
        }
      }, 1500);
    });
    
    // Show promise-based toast
    toast.promise(
      refetchPromise,
      {
        pending: 'Refreshing volunteer opportunities...',
        success: 'Volunteer opportunities refreshed successfully!',
        error: 'Failed to refresh volunteer opportunities. Please try again.'
      }
    );
    
    try {
      await refetchPromise;
    } finally {
      setIsRefreshing(false);
    }
  };

  // Extract unique categories and locations for filters
  const categories = ['all', ...new Set(opportunities.map(opportunity => opportunity.category))];
  const locations = ['all', ...new Set(opportunities.map(opportunity => opportunity.location))];

  // Filter opportunities based on search term, category, and location
  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = searchTerm === '' || 
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.organization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || opportunity.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || opportunity.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleNewOpportunity = async (newOpportunity) => {
    try {
      await createOpportunity(newOpportunity).unwrap();
      toast.success('Volunteer opportunity created successfully!');
      setIsFormOpen(false);
      delayedRefetch();
    } catch (error) {
      toast.error('Failed to create volunteer opportunity. Please try again.');
      console.error('Error creating volunteer opportunity:', error);
    }
  };

  const handleUpdateOpportunity = async (updatedOpportunity) => {
    try {
      await updateOpportunity(updatedOpportunity).unwrap();
      toast.success('Volunteer opportunity updated successfully!');
      setIsFormOpen(false);
      setEditingOpportunity(null);
      delayedRefetch();
    } catch (error) {
      toast.error('Failed to update volunteer opportunity. Please try again.');
      console.error('Error updating volunteer opportunity:', error);
    }
  };

  const handleDeleteOpportunity = async (opportunityId) => {
    if (window.confirm('Are you sure you want to delete this volunteer opportunity?')) {
      try {
        await deleteOpportunity(opportunityId).unwrap();
        toast.success('Volunteer opportunity deleted successfully!');
        delayedRefetch();
      } catch (error) {
        toast.error('Failed to delete volunteer opportunity. Please try again.');
        console.error('Error deleting volunteer opportunity:', error);
      }
    }
  };

  const handleEditOpportunity = (opportunity) => {
    setEditingOpportunity(opportunity);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
        <ErrorDisplay 
          error={error} 
          onRetry={delayedRefetch} 
          message="Error loading volunteer opportunities" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Volunteer Opportunities Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Manage all volunteer opportunities for your community
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={delayedRefetch}
                disabled={isRefreshing}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 disabled:from-purple-400 disabled:to-purple-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </button>
              <button
                onClick={() => {
                  setEditingOpportunity(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New Opportunity
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl text-center font-bold text-emerald-600 dark:text-emerald-400">
              {opportunities.length}
            </div>
            <div className="text-gray-600 text-center  dark:text-gray-300 mt-1">
              Total Opportunities
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl  text-center font-bold text-blue-600 dark:text-blue-400">
              {opportunities.filter((op) => op.spotsAvailable > 0).length}
            </div>
            <div className="text-gray-600 text-center  dark:text-gray-300 mt-1">
              Active Opportunities
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-3xl text-center  font-bold text-purple-600 dark:text-purple-400">
              {opportunities.reduce((sum, op) => sum + op.spotsAvailable, 0)}
            </div>
            <div className="text-gray-600 text-center  dark:text-gray-300 mt-1">
              Total Available Spots
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 md:items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-black/40 border border-slate-200 dark:border-emerald-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300 hover:border-slate-300 hover:shadow-md dark:text-gray-100"
              />
            </div>

            {/* Category Filter */}
            <CustomSelect
              label="Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              placeholder="All Categories"
            />

            {/* Location Filter */}
            <CustomSelect
              label="Location"
              value={selectedLocation}
              onChange={setSelectedLocation}
              options={locations}
              placeholder="All Locations"
            />

            {/* Show Inactive Toggle */}
            <div className="flex lg:ml-5 items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`block w-14 h-8 rounded-full ${
                      showInactive
                        ? "bg-emerald-500"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  ></div>
                  <div
                    className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                      showInactive ? "transform translate-x-6" : ""
                    }`}
                  ></div>
                </div>
                <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
                  Show Inactive
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-6">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <VolunteerOpportunityCard
                key={opportunity._id}
                opportunity={opportunity}
                onEdit={handleEditOpportunity}
                onDelete={handleDeleteOpportunity}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400 dark:text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No opportunities found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {searchTerm ||
                selectedCategory !== "all" ||
                selectedLocation !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "Get started by creating your first volunteer opportunity."}
              </p>
              <button
                onClick={() => {
                  setEditingOpportunity(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Opportunity
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Volunteer Opportunity Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {editingOpportunity
                    ? "Edit Volunteer Opportunity"
                    : "Create New Volunteer Opportunity"}
                </h2>
                <button
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingOpportunity(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <VolunteerOpportunityForm
                initialData={editingOpportunity}
                onSubmit={
                  editingOpportunity
                    ? handleUpdateOpportunity
                    : handleNewOpportunity
                }
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingOpportunity(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerOpportunitiesDashboard;