import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HeroSection from '../components/volunteer/HeroSection';
import AdvancedFilters from '../components/volunteer/AdvancedFilters';
import OpportunitiesSection from '../components/volunteer/OpportunitiesSection';
import NoResults from '../components/volunteer/NoResults';
import CallToAction from '../components/volunteer/CallToAction';
import ApplicationModal from '../components/volunteer/ApplicationModal';
import BackgroundPattern from '../components/volunteer/BackgroundPattern';
import { clearFilters } from '../redux/filtersSlice';

const VolunteerBoard = () => {
  const dispatch = useDispatch();
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const opportunities = useSelector((state) => state.opportunities.opportunities);
  const filters = useSelector((state) => state.filters);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        filters.search === '' ||
        opportunity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        opportunity.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        opportunity.organization.toLowerCase().includes(filters.search.toLowerCase()) ||
        opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        );

      const matchesCategory =
        filters.category === 'All' || opportunity.category === filters.category;
      const matchesLocation =
        filters.location === 'All' || opportunity.location === filters.location;
      const matchesSkills =
        filters.skills === 'All' || opportunity.skills.includes(filters.skills);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <BackgroundPattern />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <HeroSection />

          <AdvancedFilters opportunitiesCount={filteredOpportunities.length} />

          <div className="mt-12 space-y-16">
            {filteredOpportunities.length === 0 ? (
              <NoResults onClearFilters={handleClearFilters} />
            ) : (
              <OpportunitiesSection onApply={handleApply} />
            )}

            {filteredOpportunities.length > 0 && <CallToAction />}
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
