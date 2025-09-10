import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Edit, Trash2, Eye, Filter, Search, RefreshCw, Users, ChevronDown, Stars } from 'lucide-react';
import { 
  useGetVolunteerOpportunitiesQuery, 
  useCreateVolunteerOpportunityMutation, 
  useUpdateVolunteerOpportunityMutation, 
  useDeleteVolunteerOpportunityMutation,
  useGetVolunteerOpportunityApplicantsQuery,
  useUpdateVolunteerApplicationStatusMutation
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
  const [selectedOpportunityForApplicants, setSelectedOpportunityForApplicants] = useState(null);
  const [isApplicantsModalOpen, setIsApplicantsModalOpen] = useState(false);
  const [openApplicantId, setOpenApplicantId] = useState(null);

  // RTK Query hooks
  const { data, error, isLoading, refetch } = useGetVolunteerOpportunitiesQuery();
  const [createOpportunity] = useCreateVolunteerOpportunityMutation();
  const [updateOpportunity] = useUpdateVolunteerOpportunityMutation();
  const [deleteOpportunity] = useDeleteVolunteerOpportunityMutation();
  const [updateApplicationStatus] = useUpdateVolunteerApplicationStatusMutation();
  
  // Applicant query hook
  const { 
    data: applicantsData, 
    isLoading: applicantsLoading, 
    refetch: refetchApplicants 
  } = useGetVolunteerOpportunityApplicantsQuery(
    selectedOpportunityForApplicants?._id, 
    { 
      skip: !selectedOpportunityForApplicants?._id || !isApplicantsModalOpen 
    }
  );

  const opportunities = data?.data || [];
  const applicants = applicantsData?.data || [];

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

  // Fetch applicants for a specific opportunity
  const fetchApplicants = async (opportunity) => {
    try {
      setSelectedOpportunityForApplicants(opportunity);
      setIsApplicantsModalOpen(true);
      setOpenApplicantId(null); // Reset accordion state when opening modal
    } catch (error) {
      console.error('Error fetching applicants:', error);
      toast.error('Failed to fetch applicants. Please try again.');
    }
  };

  // Update applicant status
  const updateApplicantStatus = async (applicationId, status) => {
    try {
      const result = await updateApplicationStatus({ 
        applicationId, 
        status 
      }).unwrap();
      
      if (result.success) {
        toast.success(result.message);
        // Refetch applicants to update the UI
        refetchApplicants();
      } else {
        toast.error(result.message || 'Failed to update applicant status. Please try again.');
      }
    } catch (error) {
      toast.error('Failed to update applicant status. Please try again.');
      console.error('Error updating applicant status:', error);
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
              id={opportunity._id}
                key={opportunity._id}
                opportunity={opportunity}
                onEdit={handleEditOpportunity}
                onDelete={handleDeleteOpportunity}
                onViewApplicants={fetchApplicants}
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

      {/* Applicants Modal */}
      {isApplicantsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Applicants for {selectedOpportunityForApplicants?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedOpportunityForApplicants?.organization}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsApplicantsModalOpen(false);
                    setSelectedOpportunityForApplicants(null);
                    setOpenApplicantId(null);
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

              {applicantsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Stars className="w-8 h-8 text-gray-400 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No applicants yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    No one has applied for this opportunity yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Showing {applicants.length} applicant{applicants.length !== 1 ? 's' : ''}
                  </div>
                  <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {applicants.map((applicant) => (
                      <div 
                        key={applicant._id} 
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
                      >
                        {/* Accordion Header */}
                        <div 
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                          onClick={() => setOpenApplicantId(openApplicantId === applicant._id ? null : applicant._id)}
                        >
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {applicant.fullName}
                            </h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${applicant.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : applicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                              {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                            </span>
                          </div>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${openApplicantId === applicant._id ? 'rotate-180' : ''}`} 
                          />
                        </div>
                        
                        {/* Accordion Content */}
                        {openApplicantId === applicant._id && (
                          <div className="p-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300 mb-4">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {applicant.email}
                              </div>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {applicant.phone}
                              </div>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {applicant.availability}
                              </div>
                              <div className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Applied {new Date(applicant.appliedAt).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Motivation</h4>
                              <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {applicant.motivation}
                              </p>
                            </div>
                            
                            {applicant.experience && (
                              <div className="mt-3">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-1">Experience</h4>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                  {applicant.experience}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex flex-col gap-2 mt-4">
                              <button
                                onClick={() => updateApplicantStatus(applicant._id, 'accepted')}
                                disabled={applicant.status === 'accepted'}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${applicant.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                              >
                                {applicant.status === 'accepted' ? 'Accepted' : 'Accept'}
                              </button>
                              <button
                                onClick={() => updateApplicantStatus(applicant._id, 'rejected')}
                                disabled={applicant.status === 'rejected'}
                                className={`px-3 py-2 text-sm rounded-lg transition-colors ${applicant.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                              >
                                {applicant.status === 'rejected' ? 'Rejected' : 'Reject'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerOpportunitiesDashboard;