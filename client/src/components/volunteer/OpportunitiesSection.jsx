import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import VolunteerCard from "./VolunteerCard";
import VolunteerCardSkeleton from "./VolunteerCardSkeleton";

const OpportunitiesSection = ({ opportunities, onApply }) => {
  const filters = useSelector((state) => state.filters);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredOpportunities = useMemo(() => {
    if (!Array.isArray(opportunities)) {
      return [];
    }
    
    return opportunities.filter((opportunity) => {
      const matchesSearch =
        filters.search === "" ||
        opportunity.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        (opportunity.skills && opportunity.skills.some((skill) =>
          skill.toLowerCase().includes(filters.search.toLowerCase())
        ));

      const matchesCategory =
        filters.category === "All" || opportunity.category === filters.category;
      const matchesLocation =
        filters.location === "All" || opportunity.location === filters.location;
      const matchesSkills =
        filters.skills === "All" || (opportunity.skills && opportunity.skills.includes(filters.skills));
      const matchesTimeCommitment =
        filters.timeCommitment === "All" ||
        opportunity.timeCommitment === filters.timeCommitment;
      const matchesSkillLevel =
        filters.skillLevel === "All" ||
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

  const groupedOpportunities = useMemo(() => {
    return filteredOpportunities.reduce((acc, opportunity) => {
      if (!acc[opportunity.category]) {
        acc[opportunity.category] = [];
      }
      acc[opportunity.category].push(opportunity);
      return acc;
    }, {});
  }, [filteredOpportunities]);

  if (isLoading) {
    return (
      <div className="space-y-12">
        {[1, 2, 3].map((section) => (
          <div key={section}>
            <div className="h-8 bg-slate-200  rounded w-64 mb-8 animate-pulse"></div>
            <div className="space-y-6">
              {[1, 2].map((card) => (
                <VolunteerCardSkeleton key={card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedOpportunities).map(([category, opportunities]) => (
        <section key={category} className="scroll-mt-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-gray-100">
              {category}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
            <span className="text-slate-500 dark:text-gray-200 text-sm font-medium">
              {opportunities.length}{" "}
              {opportunities.length === 1 ? "opportunity" : "opportunities"}
            </span>
          </div>

          <div className="space-y-6">
            {opportunities.map((opportunity) => (
              <VolunteerCard
                key={opportunity._id || opportunity.id}
                opportunity={opportunity}
                onApply={onApply}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default OpportunitiesSection;
