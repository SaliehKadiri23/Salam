import React from 'react';

const ImpactPreview = ({ amount, donationType, detailed = false }) => {
  const getImpactData = (amount, type) => {
    const impacts = {
      zakat: [
        {
          metric: Math.floor(amount / 10),
          label: 'meals provided',
          icon: '🍽️',
        },
        {
          metric: Math.floor(amount / 25),
          label: 'families helped',
          icon: '🏠',
        },
      ],
      sadaqah: [
        {
          metric: Math.floor(amount / 15),
          label: 'children educated',
          icon: '📚',
        },
        {
          metric: Math.floor(amount / 30),
          label: 'medical treatments',
          icon: '❤️‍🩹',
        },
      ],
      general: [
        {
          metric: Math.floor(amount / 20),
          label: 'community programs',
          icon: '🏘️',
        },
        {
          metric: Math.floor(amount / 12),
          label: 'support packages',
          icon: '📦',
        },
      ],
      orphan: [
        {
          metric: Math.floor(amount / 50),
          label: 'orphans supported',
          icon: '🎖️',
        },
        {
          metric: Math.floor(amount / 25),
          label: 'months of care',
          icon: '❤️',
        },
      ],
    };

    return impacts[type] || impacts.general;
  };

  const impacts = getImpactData(amount, donationType);

  return (
    <div
      className={`grid gap-3 ${detailed ? "md:grid-cols-2" : "grid-cols-1"}`}
    >
      {impacts.map((impact, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-lg p-3"
        >
          <span className="text-2xl">{impact.icon}</span>
          <div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {impact.metric}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-100">
              {impact.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactPreview;