import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useGetVolunteerOpportunitiesQuery } from '../services/apiSlice';
import HeroSection from '../components/volunteer/HeroSection';
import AdvancedFilters from '../components/volunteer/AdvancedFilters';
import OpportunitiesSection from '../components/volunteer/OpportunitiesSection';
import NoResults from '../components/volunteer/NoResults';
import CallToAction from '../components/volunteer/CallToAction';
import ApplicationModal from '../components/volunteer/ApplicationModal';
import BackgroundPattern from '../components/volunteer/BackgroundPattern';
import { clearFilters } from '../redux/filtersSlice';
import { Settings } from 'lucide-react';

const VolunteerBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const { data: apiResponse, isLoading, isError, refetch } = useGetVolunteerOpportunitiesQuery();
  const opportunities = apiResponse?.data || [];
  const filters = useSelector((state) => state.filters);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        filters.search === '' ||
        opportunity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(filters.search.toLowerCase()) ||
        (opportunity.skills && opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        ));

      const matchesCategory =
        filters.category === 'All' || opportunity.category === filters.category;
      const matchesLocation =
        filters.location === 'All' || opportunity.location === filters.location;
      const matchesSkills =
        filters.skills === 'All' || (opportunity.skills && opportunity.skills.includes(filters.skills));
      const matchesTimeCommitment =
        filters.timeCommitment === 'All' ||
        opportunity.timeCommitment === filters.timeCommitment;
      const matchesSkillLevel =
        filters.skillLevel === 'All' ||
        opportunity.skillLevel === filters.skillLevel;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesSkills &&
        matchesTimeCommitment &&
        matchesSkillLevel
      );
    });
  }, [filters, opportunities]);

  const handleApply = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsApplicationModalOpen(true);
  };

  const handleSubmitApplication = (formData) => {
    console.log(
      'Application submitted:',
      formData,
      'for',
      selectedOpportunity.title
    );
    setIsApplicationModalOpen(false);
    setSelectedOpportunity(null);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/30 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/30 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Opportunities</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            There was a problem loading volunteer opportunities. Please try again later.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 via-blue-50/30 to-teal-50/30 dark:from-gray-800 dark:via-gray-800/90 dark:to-gray-800">
      <BackgroundPattern />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 relative z-10">
        <div className="max-w-7xl mx-auto">
          

          <HeroSection />

          <AdvancedFilters opportunitiesCount={filteredOpportunities.length} />

          <div className="mt-12 space-y-16">
            {filteredOpportunities.length === 0 ? (
              <NoResults onClearFilters={handleClearFilters} />
            ) : (
              <OpportunitiesSection opportunities={filteredOpportunities} onApply={handleApply} />
            )}

            {<CallToAction />}
          </div>
        </div>
      </main>

      <ApplicationModal
        opportunity={selectedOpportunity}
        isOpen={isApplicationModalOpen}
        onClose={() => {
          setIsApplicationModalOpen(false);
          setSelectedOpportunity(null);
        }}
        onSubmit={handleSubmitApplication}
      />
    </div>
  );
};

export default VolunteerBoard;
