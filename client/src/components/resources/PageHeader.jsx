import React from "react";
import { CheckCircle2, BookmarkCheck, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

const PageHeader = ({ userStats }) => (
  <div className="mb-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Islamic Resources & Learning
        </h1>
        <p className="text-gray-600">
          Deepen your understanding with curated Islamic knowledge
        </p>
      </div>

      {/* User Progress Stats */}
      <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
        <motion.div
          initial={{
            opacity: 0,
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
          }}
          exit={{
            opacity: 0,
            y: 200,
          }}
          viewport={{ once: true }}
        >
          <StatCard
            icon={CheckCircle2}
            value={userStats.totalCompleted}
            label="Completed"
            color="emerald"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 250,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.55 },
          }}
          exit={{
            opacity: 0,
            y: 250,
          }}
          viewport={{ once: true }}
        >
          <StatCard
            icon={BookmarkCheck}
            value={userStats.totalBookmarked}
            label="Bookmarked"
            color="amber"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 300,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.7 },
          }}
          exit={{
            opacity: 0,
            y: 300,
          }}
          viewport={{ once: true }}
        >
          <StatCard
            icon={TrendingUp}
            value={userStats.totalInProgress}
            label="In Progress"
            color="blue"
          />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 350,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.85 },
          }}
          exit={{
            opacity: 0,
            y: 350,
          }}
          viewport={{ once: true }}
        >
          <StatCard
            icon={Clock}
            value={`${userStats.totalTimeSpent}m`}
            label="Time Spent"
            color="purple"
          />
        </motion.div>
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    blue: "text-blue-600",
    purple: "text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-emerald-100">
      <div className="flex items-center space-x-2">
        <Icon className={`w-4 h-4 ${colorClasses[color]}`} />
        <span className="text-sm font-medium text-gray-900">{value}</span>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
    </div>
  );
};

export default PageHeader;
